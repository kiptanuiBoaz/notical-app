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

        const authenticatedUser = await supabase.auth.getUser()

        const { data: { user: { id, email, user_metadata, role, aud } } } = authenticatedUser;
        console.log(id, email, user_metadata, role, aud);
        const user = await getUserProfile(id);
        console.log(user)
        const stripeCustomer = await getStripeCustomerId(user.stripe_customer_id);

        //update redux state
        dispatch(UPDATE_AUTH({
          user_id: id,
          email: email,
          full_name: user_metadata.full_name,
          avatarUrl: user_metadata.avatar_url,
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

  },);

  return <p></p>;
};

export default Home;
