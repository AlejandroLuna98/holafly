/* eslint-disable @next/next/no-img-element */
import { ICard } from '@/models/Card';
import { convertKBtoGB } from '@/utils/convertKBtoGB';
import { formatDate } from '@/utils/formatDate';
import React from 'react';
import DonutChart from './Doughnut';

export const Card: React.FC<ICard> = (card): JSX.Element => {
  const { country, status, flag, plan, dateStart, dateEnd, consumption } = card;

  const statusColor = {
    Active: 'bg-blue-200',
    Pending: 'bg-yellow-200',
    Expired: 'bg-neutral-300	',
  };

  return (
    <div className="w-64 rounded-lg overflow-hidden shadow-lg bg-white p-4 relative flex flex-col">
      <div className=" pt-4 pb-2 flex justify-between items-center">
        <span
          className={`flex flex-2 items-center ${statusColor[status]} rounded-full pr-3 py-1 text-sm font-semibold text-gray-700`}
        >
          <img src={flag} alt={flag} className="w-6 h-6 rounded-full mr-2" />
          {status}
        </span>
        {status === 'Active' && (
          <div style={{ width: '70px', height: '70px' }}>
            <DonutChart
              plan={plan}
              totalConsumptionKB={consumption?.totalConsumption as number}
            />
          </div>
        )}
      </div>
      <div className=" py-4">
        <div className="font-bold text-xl mb-2">{country}</div>
        {status === 'Expired' && (
          <p className="text-gray-700 text-base pb-1">
            {formatDate(dateStart)} - {formatDate(dateEnd as Date)}
          </p>
        )}
        <p className="text-gray-600 text-xs">{plan}</p>
      </div>
      <div className=" py-4 flex flex-col mt-auto ">
        {status === 'Active' && (
          <>
            <button className=" px-4 py-2 rounded-lg border border-gray-300  inline-block hover:bg-gray-100	 ">
              Ver detalles
            </button>
            <button className="bg-green-400 hover:bg-green-500  px-4 py-2 rounded-lg  mt-2">
              Añadir más datos
            </button>
          </>
        )}
        {status === 'Pending' && (
          <button className=" px-4 py-2 rounded-lg  text-white bg-red-600	hover:bg-red-700  relative bottom-0	">
            Ver detalles y instalar
          </button>
        )}
      </div>
    </div>
  );
};
