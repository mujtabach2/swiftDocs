import {useRouter} from 'next/router';
import {useUser} from '../../context/userContext';
import { json } from 'body-parser';
import { checkout } from '@/app/lib/actions/stripe';
import {loadStripe } from '@stripe/stripe-js';


export default function Checkout(priceId) {
    const{data: user} = useUser();

    const router = useRouter();
  
    const handleCheckout = async () => {
      if (user?.id) {
        const date = json.parse(
        await checkout(user.email, priceId, Location.origin)
        );

        await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).then(
            (stripe) => {
                stripe.redirectToCheckout({ sessionId: data.id });
            }
        );

        }
        else {
            router.push('/signup');
        }

    }
   handleCheckout(); 
    
}

  