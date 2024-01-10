'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getCookie } from '@/utils/auth';

import { Loader } from '@/components/Loader';
import Home from './home/page';
import Login from './login/page';
import constants from '@/utils/constants';

const Page = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie(constants.TOKEN);
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? <Home /> : <Login />;
};

export default Page;
