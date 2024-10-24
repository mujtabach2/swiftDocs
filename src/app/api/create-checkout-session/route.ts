// src/app/api/create-checkout-session/route.js
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import stripe from "../../config/stripeClient";

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies });

  console.log("Cookies:", await cookies().getAll());

  try {
    // Parse the request body to get the planId
    const { planId } = await request.json();
    console.log("Received Plan ID:", planId);

    // Get the current user's session using Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("User:", user);
    console.log("Session Error:", userError);

    // If no user is found, return a 401 Unauthorized response
    if (!user) {
      console.log('User is not authenticated');
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the user ID from the session
    const userId = user.id;

    // Map the planId to the corresponding Stripe price ID and mode
    const { priceId, mode } = getPriceIdForPlan(planId);

    // If the planId is invalid, return a 400 Bad Request response
    if (!priceId) {
      return NextResponse.json({ error: "Invalid planId" }, { status: 400 });
    }

    // Create the Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId, // Link the session to the user
    });

    // Return the Stripe session ID as a response
    console.log("Stripe session created:", stripeSession);
    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    // Log any errors that occur
    console.error("Error in create-checkout-session:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// Helper function to map planId to Stripe price ID and mode
function getPriceIdForPlan(planId) {
  const priceMap = {
    "7-day-plan": {
      priceId: "price_1PwsfxC6lJGJP4oFfRCKuFWj",
      mode: "subscription",
    },
    "30-day-plan": {
      priceId: "price_1PwsgAC6lJGJP4oFNjztlkov",
      mode: "subscription",
    },
    "180-day-plan": {
      priceId: "price_1PwsgPC6lJGJP4oFgCdCsH6K",
      mode: "payment",
    },
  };
  
  return priceMap[planId] || { priceId: null, mode: "payment" };
}
