"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { UPDATE_AUTH } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUserProfile } from '@/libs/supabase/getUserProfile';
import { getStripeCustomerId } from '@/libs/stripe/getStripeCustomerId';


const Home = ({ searchParams }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClientComponentClient();

  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        //get currently signed in user
        const { data: { user: { id, email, user_metadata, role, aud } } } = await supabase.auth.getUser();

        //get stripe customer id from users table in db
        const { stripe_customer_id, active } = await getUserProfile(id);

        //get stripe customer info from stripe
        const stripeCustomer = await getStripeCustomerId(stripe_customer_id);

        //update redux state
        dispatch(UPDATE_AUTH({
          user_id: id,
          email: email,
          full_name: user_metadata.full_name,
          avatarUrl: user_metadata.avatar_url,
          syncStatus: active,
          role: {
            name: role,
            id: aud
          },
          stripe: {
            subscriptionEnd: stripeCustomer?.data?.subscriptions.data[0]?.current_period_end ?? null,
            customerId: stripeCustomer.data.id,
            stripeSubscriptionStatus: stripeCustomer?.data?.subscriptions.data[0]?.status ?? false,
            subscriptionPlan: stripeCustomer?.data?.subscriptions.data[0]?.plan.amount ?? null,
            subscriptionInterval: stripeCustomer?.data?.subscriptions.data[0]?.plan.interval ?? null,
          }
        }));
      }


      getCurrentUser();
      if (searchParams.redirectedFrom === "stripe") {
        router.push("/subscriptions");
      } else {
        router.push("/connections")
      }

    } catch (e) {
      console.error(e.message)
    }

  });

  return <p></p>;
};

export default Home;
