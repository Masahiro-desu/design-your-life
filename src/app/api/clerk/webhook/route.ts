import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prismaClient'

export async function POST(req: Request) {
  console.log("💡 Webhook エンドポイントが呼び出されました");
  
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    console.error("❌ SIGNING_SECRET環境変数が設定されていません");
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Svixヘッダーが不足しています");
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  let payload;
  try {
    payload = await req.json();
    console.log("📦 受信したペイロード:", JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error("❌ ペイロードのJSONパースに失敗:", error);
    return new Response('Error: Invalid JSON', { status: 400 });
  }
  
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
    console.log("✅ ウェブフックの署名検証に成功");
  } catch (err) {
    console.error("❌ ウェブフックの署名検証に失敗:", err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Process the webhook event
  const eventType = evt.type
  console.log(`📣 受信したイベントタイプ: ${eventType}`);
  console.log(`🔍 イベントデータ:`, JSON.stringify(evt.data, null, 2));

  // ユーザー作成時の処理
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, username } = evt.data;
      console.log(`👤 新規ユーザー作成: ID=${id}, Email=${email_addresses?.[0]?.email_address}, Username=${username}`);
      
      // データ存在チェック
      if (!id) {
        console.error("❌ ユーザーIDがありません");
        return new Response('Error: No user ID provided', { status: 400 });
      }

      // メールアドレスの存在チェック
      const email = email_addresses?.[0]?.email_address;
      if (!email) {
        console.error("❌ メールアドレスがありません");
        return new Response('Error: No email address provided', { status: 400 });
      }
      
      // パスワードハッシュのプレースホルダー
      const passwordHashPlaceholder = "hashed_password_placeholder";
      
      // デバイス情報を取得
      const deviceType = extractDeviceInfo(payload);
      console.log(`📱 デバイスタイプ: ${deviceType}`);

      // 既存ユーザーチェック
      const existingUser = await prisma.user_db.findUnique({
        where: { email: email }
      });

      if (existingUser) {
        console.error(`❌ メールアドレス ${email} は既に使用されています`);
        return new Response('Error: Email already exists', { status: 409 });
      }
      
      // ユーザー情報をデータベースに保存
      const newUser = await prisma.user_db.create({
        data: {
          user_id: id,
          email: email,
          user_name: username || email.split('@')[0],
          password_hash: passwordHashPlaceholder,
          device_type: deviceType || 'unknown',
        }
      });
      
      console.log(`✅ ユーザーをデータベースに登録しました: ${JSON.stringify(newUser)}`);
      return new Response(JSON.stringify({ success: true, message: 'User created', userId: id }), { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("❌ ユーザー作成エラー:", error);
      // エラーの詳細をログに出力
      if (error instanceof Error) {
        console.error("エラーの詳細:", error.message);
        console.error("スタックトレース:", error.stack);
      }
      return new Response(JSON.stringify({ 
        error: 'Error creating user',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // ユーザー更新時の処理
  else if (eventType === "user.updated") {
    try {
      const { id, email_addresses, username } = evt.data;
      console.log(`🔄 ユーザー更新: ID=${id}`);
      
      // データ存在チェック
      if (!id) {
        console.error("❌ ユーザーIDがありません");
        return new Response('Error: No user ID provided', { status: 400 });
      }
      
      // デバイス情報を取得
      const deviceType = extractDeviceInfo(payload);
      
      // ユーザーが存在するか確認
      const existingUser = await prisma.user_db.findUnique({
        where: { user_id: id }
      });
      
      if (!existingUser) {
        console.log(`⚠️ 更新対象のユーザーが見つかりません。新規作成します: ID=${id}`);
        // ユーザーが存在しない場合は新規作成
        const newUser = await prisma.user_db.create({
          data: {
            user_id: id,
            email: email_addresses?.[0]?.email_address || "",
            user_name: username || "",
            password_hash: "updated_user_hash",
            device_type: deviceType,
          }
        });
        console.log(`✅ 存在しないユーザーを新規作成しました: ${JSON.stringify(newUser)}`);
      } else {
        // 既存ユーザーの場合は更新
        const updatedUser = await prisma.user_db.update({
          where: { user_id: id },
          data: {
            email: email_addresses?.[0]?.email_address || existingUser.email,
            user_name: username || existingUser.user_name,
            device_type: deviceType || existingUser.device_type,
            // updated_atはPrismaが自動的に更新する（@updatedAt装飾子のため）
          }
        });
        console.log(`✅ ユーザー情報を更新しました: ${JSON.stringify(updatedUser)}`);
      }
      
      return new Response(JSON.stringify({ success: true, message: 'User updated' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("❌ ユーザー更新エラー:", error);
      return new Response('Error updating user', { status: 500 });
    }
  }
  
  // セッション作成時（ログイン時）の処理
  else if (eventType === "session.created") {
    try {
      // セッションイベントからユーザーIDを取得
      const userId = evt.data.user_id;
      console.log(`🔑 セッション作成（ログイン）: UserID=${userId}`);
      
      if (!userId) {
        console.error("❌ セッション作成イベントにユーザーIDがありません");
        return new Response('No user ID found', { status: 400 });
      }
      
      // デバイス情報を取得
      const deviceType = extractDeviceInfo(payload);
      
      // ユーザーが存在するか確認
      const existingUser = await prisma.user_db.findUnique({
        where: { user_id: userId }
      });
      
      if (existingUser) {
        // 既存ユーザーの場合、updated_atとdevice_typeを更新
        const updatedUser = await prisma.user_db.update({
          where: { user_id: userId },
          data: {
            device_type: deviceType || existingUser.device_type,
            // updated_atはPrismaが自動的に更新する（@updatedAt装飾子のため）
          }
        });
        console.log(`✅ ログイン時の更新が完了しました: ${JSON.stringify(updatedUser)}`);
      } else {
        // ユーザーがデータベースに存在しない場合、新規作成の処理を実行
        console.log(`⚠️ ログイン時にユーザーがDBに見つかりません: ID=${userId}。新規作成します。`);
        
        // Clerkからユーザー情報を取得する処理（実際はClerk SDKを使って詳細情報を取得する必要がある）
        const email = payload.data?.email || "";
        const username = payload.data?.username || "";
        
        // ユーザーを新規作成
        const newUser = await prisma.user_db.create({
          data: {
            user_id: userId,
            email: email,
            user_name: username,
            password_hash: "login_created_hash",
            device_type: deviceType,
          }
        });
        console.log(`✅ ログイン時に存在しないユーザーを新規作成しました: ${JSON.stringify(newUser)}`);
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Session created handled' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("❌ セッション作成エラー:", error);
      return new Response('Error handling session', { status: 500 });
    }
  }
  
  // セッション終了時（ログアウト時）の処理
  else if (eventType === "session.ended") {
    try {
      const userId = evt.data.user_id;
      console.log(`🚪 セッション終了（ログアウト）: UserID=${userId}`);
      
      if (userId) {
        // ログアウト時もupdated_atを更新する場合
        const existingUser = await prisma.user_db.findUnique({
          where: { user_id: userId }
        });
        
        if (existingUser) {
          const updatedUser = await prisma.user_db.update({
            where: { user_id: userId },
            data: {} // データを指定しなくても@updatedAtにより更新日時は更新される
          });
          console.log(`✅ ログアウト時の更新が完了しました: ${JSON.stringify(updatedUser)}`);
        } else {
          console.log(`⚠️ ログアウト時にユーザーが見つかりません: ID=${userId}`);
        }
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Session ended handled' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("❌ セッション終了エラー:", error);
      return new Response('Error handling session end', { status: 500 });
    }
  } else {
    console.log(`ℹ️ 未処理のイベントタイプ: ${eventType}`);
  }

  return new Response(JSON.stringify({ success: true, message: 'Webhook received' }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// ペイロードからデバイス情報を抽出するヘルパー関数
function extractDeviceInfo(payload: Record<string, unknown>): string | null {
  // ペイロードからデバイス情報を抽出する処理
  console.log("🔍 デバイス情報抽出中...");
  
  // User-Agentや他の情報からデバイスタイプを判断
  const userAgent = 
    typeof payload.data === 'object' && payload.data
      ? (payload.data as { 
          user_agent?: string;
          client?: { user_agent?: string };
          request?: { user_agent?: string };
          device?: { user_agent?: string };
        }).user_agent ||
        (payload.data as { client?: { user_agent?: string } }).client?.user_agent ||
        (payload.data as { request?: { user_agent?: string } }).request?.user_agent ||
        (payload.data as { device?: { user_agent?: string } }).device?.user_agent
      : null;
                   
  if (!userAgent) {
    console.log("⚠️ User-Agent情報が見つかりません");
    return null;
  }
  
  console.log(`🔍 User-Agent: ${userAgent}`);
  
  // モバイルデバイスの検出
  if (/android/i.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios';
  if (/windows phone/i.test(userAgent)) return 'windows_phone';
  
  // デスクトップの検出
  if (/windows/i.test(userAgent)) return 'windows';
  if (/macintosh|mac os/i.test(userAgent)) return 'mac';
  if (/linux/i.test(userAgent)) return 'linux';
  
  // その他のデバイス
  return 'other';
}