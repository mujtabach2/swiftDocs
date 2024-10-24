import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import stripe from "../../config/stripeClient";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { sessionId } = await request.json();

    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 },
      );
    }

    // Get the current user's session
    const {
      data: { session: userSession },
    } = await supabase.auth.getSession();

    if (!userSession) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Ensure the session belongs to the current user
    if (session.client_reference_id !== userSession.user.id) {
      return NextResponse.json(
        { error: "Session does not belong to the current user" },
        { status: 403 },
      );
    }

    // Update user's subscription status if not already updated by webhook
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: "active",
        stripe_session_id: sessionId,
      })
      .eq("id", userSession.user.id)
      .is("subscription_status", null);

    if (error) {
      console.error("Error updating user subscription:", error);
      return NextResponse.json(
        { error: "Failed to update user subscription" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in verify-session:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}