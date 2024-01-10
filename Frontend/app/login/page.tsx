'use client';
import React, { useEffect } from 'react';
import '../globals.css';
import { LoginForm } from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/auth';
import { Home } from '@/components/Home';
import constants from '@/utils/constants';

export default function Page() {
  const router = useRouter();
  const token = getCookie(constants.TOKEN);

  useEffect(() => {
    if (token) {
      router.push('/home');
    }
  }, [token, router]);

  return token ? <Home token={token} /> : <LoginForm />;
}
