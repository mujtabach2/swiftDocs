'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function PaymentSuccess() {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const { session_id } = router.query;
    if (session_id && user) {
      verifySession(session_id as string);
    }
  }, [router.query, user]);

  const verifySession = async (sessionId: string) => {
    try {
      // Verify the session on the server-side
      const response = await fetch('/api/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        // Refresh user data to get updated subscription status
        const { data, error } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Redirect to dashboard or appropriate page
        router.push('/dashboard');
      } else {
        throw new Error('Failed to verify session');
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>We're processing your payment. You'll be redirected shortly.</p>
    </div>
  );
}