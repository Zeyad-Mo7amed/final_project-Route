import React from 'react'
import AllCategores from '../../_components/AllCategores/AllCategores'

export default async function page({ params }: { params: { id: string } }) {
  
  const {id} = await params;
  console.log(id);
  

  return (
    <>
      
      <AllCategores id={id}/>
    </>
  );
}
