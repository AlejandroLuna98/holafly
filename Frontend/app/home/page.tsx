'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import constants from '@/utils/constants';
import { getCookie } from '@/utils/auth';
import { Home } from '@/components/Home';

export default function Page() {
  const router = useRouter();
  const token = getCookie(constants.TOKEN);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  return token ? <Home token={token} /> : null;
}
