import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import supabase from "../../config/supabaseClient";
import stripe from "../../config/stripeClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = session.user;

    // Check if user already has a Stripe customer ID
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Error fetching user profile" },
        { status: 500 },
      );
    }

    if (profile?.stripe_customer_id) {
      return NextResponse.json({ customerId: profile.stripe_customer_id });
    }

    // Create a new Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabaseUUID: user.id,
      },
    });

    // Save the Stripe customer ID to the user's profile in Supabase
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ stripe_customer_id: customer.id })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Error updating user profile" },
        { status: 500 },
      );
    }

    return NextResponse.json({ customerId: customer.id });
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
