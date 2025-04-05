// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// // 環境変数からStripeのシークレットキーを取得してインスタンスを初期化
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-02-24.acacia",
//   typescript: true,
// });

// // 環境変数からWebhookシークレットを取得
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export async function POST(request: Request) {
//   try {
//     const body = await request.text();
//     const sig = request.headers.get("stripe-signature") || "";

//     let event: Stripe.Event;

//     try {
//       if (!endpointSecret) {
//         throw new Error("Webhook secret is not configured");
//       }
//       if (!sig) {
//         throw new Error("No signature found in request");
//       }

//       // イベントを検証
//       event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Unknown error";
//       console.log(`⚠️  Webhook signature verification failed:`, errorMessage);
//       return NextResponse.json(
//         { error: `Webhook Error: ${errorMessage}` },
//         { status: 400 }
//       );
//     }

//     // イベントの処理
//     switch (event.type) {
//       case "payment_intent.succeeded": {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//         // TODO: 支払い成功時の処理を実装
//         // await handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       }

//       case "payment_method.attached": {
//         const paymentMethod = event.data.object as Stripe.PaymentMethod;
//         // TODO: 支払い方法が追加された時の処理を実装
//         // await handlePaymentMethodAttached(paymentMethod);
//         break;
//       }

//       case "checkout.session.completed": {
//         const session = event.data.object as Stripe.Checkout.Session;
//         console.log(`Checkout session ${session.id} completed`);
//         // TODO: チェックアウト完了時の処理を実装
//         // await handleCheckoutSessionCompleted(session);
//         break;
//       }

//       case "payment_intent.payment_failed": {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
//         console.log(`Payment failed: ${paymentIntent.id}`);
//         // TODO: 支払い失敗時の処理を実装
//         // await handlePaymentIntentFailed(paymentIntent);
//         break;
//       }

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // イベントの受信を確認
//     return NextResponse.json({ received: true }, { status: 200 });
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : "Unknown error";
//     console.error("Webhook error:", errorMessage);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
