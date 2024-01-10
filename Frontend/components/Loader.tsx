import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = (): JSX.Element => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#f87171"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
