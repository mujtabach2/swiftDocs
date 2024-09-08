import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import stripe from '../../config/stripeClient';
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { planId } = await request.json();
    
    // Get the current user's session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    const { priceId, mode } = getPriceIdForPlan(planId);

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid planId' }, { status: 400 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId,
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Error in create-checkout-session:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

function getPriceIdForPlan(planId: string): { priceId: string | null; mode: 'payment' | 'subscription' } {
  const priceMap = {
    '7-day-plan': { priceId: 'price_1PwsfxC6lJGJP4oFfRCKuFWj', mode: 'subscription' as const },
    '30-day-plan': { priceId: 'price_1PwsgAC6lJGJP4oFNjztlkov', mode: 'subscription' as const },
    '180-day-plan': { priceId: 'price_1PwsgPC6lJGJP4oFgCdCsH6K', mode: 'payment' as const },
  };
  return priceMap[planId] || { priceId: null, mode: 'payment' as const };
}
