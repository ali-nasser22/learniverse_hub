"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helper";
import { getCourseById } from "../../../queries/courses";

const CURRENCY = "usd";

export async function createCheckoutSession(courseId: string) {
  const ui_mode = "hosted";
  const origin = (await headers()).get("origin");
  const course = await getCourseById(courseId);

  if (!course) {
    return {
      client_secret: null,
      url: null,
    };
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: course.title,
          },
          unit_amount: formatAmountForStripe(course.price, CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${course.id}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(courseId: string) {
  const course = await getCourseById(courseId);
  if (!course) {
    return {
      client_secret: null,
    };
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(course.price, CURRENCY),
    automatic_payment_methods: {
      enabled: true,
    },
    currency: CURRENCY,
  });
  return {
    client_secret: paymentIntent.client_secret,
  };
}
