"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { UPDATE_AUTH } from '@/redux/features/authSlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Home = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClientComponentClient();

  useEffect(() => {
    try {
      const getUser = async () => {
        //get current user from supabase
        const res = await supabase.auth.getUser();
        const { data: { user: { id, email, user_metadata, role, aud } } } = res;

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
      getUser();
      router.push("/connections")

    } catch (e) {
      console.error(e.message)
    }

  },);

  return <p></p>;
};

export default Home;
