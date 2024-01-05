"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { UPDATE_AUTH } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createStripeCustomer } from '@/libs/stripe/createStripeCustomer';
import { createUserProfile } from '@/libs/supabase/createUserProfile';
import { getUser } from '@/libs/supabase/getUser';
import { getStripeCustomerId } from '@/libs/stripe/getStripeCustomerId';


const Home = ({ searchParams }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClientComponentClient();

  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        const code = searchParams.code;
        // console.log(code)
        const authenticatedUser = await supabase.auth.getUser()
        // console.log(authenticatedUser);
        const { data: { user: { id, email, user_metadata, role, aud } } } = authenticatedUser;

        // const stripeCustomer = await createStripeCustomer(email);

        // await createUserProfile(stripeCustomer.data.id, id, email)
        const user = await getUser(id);
        const stripeCustomer = await getStripeCustomerId(user.stripe_customer_id);
        console.log(stripeCustomer.data);
        //update redux state
        dispatch(UPDATE_AUTH({
          user_id: id,
          email: email,
          full_name: user_metadata.full_name,
          avatarUrl: user_metadata.avatar_url,
          stripeId: stripeCustomer.data.id,
          stripeSubscriptionStatus: stripeCustomer?.data?.subscriptions.data[0]?.status ?? false,
          role: {
            name: role,
            id: aud
          },
        }));
      }
      getCurrentUser();
      router.push("/connections")

    } catch (e) {
      console.error(e.message)
    }

  },);

  return <p></p>;
};

export default Home;
