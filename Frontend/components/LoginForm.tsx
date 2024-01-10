'use client';
import { setAuthentication } from '@/utils/auth';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';
import constants from '@/utils/constants';

export const LoginForm = (): JSX.Element => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    try {
      setIsLoader(true);
      const response = await axios.post(`${constants.baseURL}/auth`, payload);
      const {
        data: { token },
      } = response;
      setAuthentication(token);
      sessionStorage.setItem('token', token);
      router.push('/home');
    } catch (e: unknown) {
      setIsError(!isError);

      const axiosError = e as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as { message: string };
        setErrorMessage(data.message);
      }
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {isLoader && <Loader />}
        <div className="flex flex-col items-center  background-login">
          <Image
            src="/logo.svg"
            alt="Holafly logo"
            width={300}
            height={300}
            className="mb-4"
          />
          <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
          <form onSubmit={handlerSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded mb-4 w-full"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="p-2 border border-gray-300 rounded mb-4 w-full"
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password}
              required
            />
            <button className="bg-red-400	 text-white p-2 rounded w-full">
              Iniciar Sesión
            </button>
          </form>
          {isError && (
            <p className="pt-5 text-red-600 font-semibold	">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};
