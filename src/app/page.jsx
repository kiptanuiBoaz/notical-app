"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/authSlice';
import { CodeOffRounded } from '@mui/icons-material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { selectAuthMethod } from '@/redux/features/authMethodSlice';

const Home = ({ session }) => {

  const router = useRouter();
  const supabase = createClientComponentClient();
  const authMethod = useSelector(selectAuthMethod);

  // Use useEffect to call router.push after rendering
  useEffect(() => {
    if (authMethod !== "email") {


      console.log(session)
    }


  },);

  return <p></p>;
};

export default Home;
