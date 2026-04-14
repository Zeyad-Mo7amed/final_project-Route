import React from 'react'
import { FadeLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <FadeLoader />
    </div>
  );
}
