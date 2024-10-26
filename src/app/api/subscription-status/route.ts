import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import stripe from "../../config/stripeClient";

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = session.user;

    // Get the user's Stripe customer ID from Supabase
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (error || !profile?.stripe_customer_id) {
      return NextResponse.json({ error: "Stripe customer ID not found" }, { status: 404 });
    }

    const customerId = profile.stripe_customer_id;

    // Retrieve the customer's subscription status from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 });
    }

    const subscription = subscriptions.data[0];
    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
