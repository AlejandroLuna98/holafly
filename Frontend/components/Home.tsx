/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/Card';
import { ICard } from '@/models/Card';
import { IUser } from '@/models/User';
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '@/utils/localStorage';
import { api } from '@/utils/api';
import { getCookie, logOut } from '@/utils/auth';
import { useRouter } from 'next/navigation';
type Props = {
  token: string;
};

export const Home: React.FC<Props> = ({ token }) => {
  const router = useRouter();
  const [activeAndPendingCards, setActiveAndPendingCards] = useState<ICard[]>(
    []
  );
  const [inactiveCards, setInactiveCards] = useState<ICard[]>([]);
  const userName = useRef<string>('');
  const getData = async () => {
    try {
      if (!getItemFromLocalStorage('user')) {
        const [usersResponse, cardsResponse] = await Promise.all([
          api.get('/getUser', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get('/getCards', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setItemToLocalStorage('user', usersResponse.data);
        setItemToLocalStorage('card', cardsResponse.data);
      }

      const user: IUser = getItemFromLocalStorage('user');
      userName.current = user.fullName;
      const cards: ICard[] = getItemFromLocalStorage('card');

      setActiveAndPendingCards(
        cards.filter((card) => card.status !== 'Expired')
      );
      setInactiveCards(cards.filter((card) => card.status === 'Expired'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const logOutSession = () => {
    logOut();
    localStorage.clear();
    router.push('/');
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      getData();
    }
  }, []);
  const [activeTab, setActiveTab] = useState('active');
  return (
    <div className="container mx-auto p-4">
      <button
        className="absolute right-5 bg-red-300	p-2 rounded opacity-75"
        onClick={logOutSession}
      >
        Cerrar sesion
      </button>
      <div className="w-full">
        <img src="/logo.svg" alt="Logo" className="w-full" />
      </div>
      <div>
        <h1 className=" text-center	text-2xl md:text-4xl font-semibold mt-5 mb-10	">
          Hola {userName.current}!
        </h1>
      </div>

      <div className="flex border-b">
        <button
          className={`flex-1 p-4 text-green-400 ${
            activeTab === 'active' && ' font-bold'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Activas
        </button>
        <button
          className={`flex-1 p-4  ${activeTab === 'expired' && 'font-bold'} ${
            !inactiveCards.length ? 'text-gray-200' : 'text-red-400'
          }`}
          onClick={() => setActiveTab('expired')}
          disabled={!inactiveCards.length}
        >
          Expiradas
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'active' && (
          <div className=" flex flex-wrap justify-center gap-4 ">
            {activeAndPendingCards.map((card: ICard) => (
              <Card {...card} key={card.id} />
            ))}
          </div>
        )}
        {activeTab === 'expired' && (
          <div className="flex flex-wrap justify-center gap-4 ">
            {inactiveCards.map((card: ICard) => (
              <Card {...card} key={card.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
