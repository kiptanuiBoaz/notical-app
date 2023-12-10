"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/connections');

  }, [router]);

  return <p></p>;
};

export default Home;
