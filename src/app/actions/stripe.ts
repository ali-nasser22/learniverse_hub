"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helper";
const CURRENCY = "usd";

export async function createCheckoutSession(formData: FormData) {
  const ui_mode = "hosted";
  const origin = (await headers()).get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: "How To become a web developer",
          },
          unit_amount: formatAmountForStripe(99.99, CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=54454`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(formData: FormData) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(99.99, CURRENCY),
    automatic_payment_methods: {
      enabled: true,
    },
    currency: CURRENCY,
  });
  return {
    client_secret: paymentIntent.client_secret,
  };
}
