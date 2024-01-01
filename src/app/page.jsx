"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { UPDATE_AUTH } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from './connections/libs/getUser';
import { createStripeCustomer } from './connections/libs/createStripeCustomer';
import { createUserProfile } from './connections/libs/createUserProfile';

const Home = ({ searchParams }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClientComponentClient();

  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        const code = searchParams.code;
        console.log(code)
        const authenticatedUser = await supabase.auth.getUser() ?? await getUser(code);
        console.log(authenticatedUser);
        const { data: { user: { id, email, user_metadata, role, aud } } } = authenticatedUser;

        const stripeCustomer = await createStripeCustomer(email);

        await createUserProfile(stripeCustomer.data.id, id, email)
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
