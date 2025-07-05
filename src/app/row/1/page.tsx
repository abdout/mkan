'use client';

import React from 'react'
import { CategoryShowcase } from '@/components/row/components/CategoryShowcase'
import { Counter } from '@/components/row/components/Counter'
import { CreationBottomBar } from '@/components/row/components/CreationBottomBar'
import dynamic from 'next/dynamic'

// Dynamically import the map component with no SSR to avoid leaflet window issues
const DynamicMap = dynamic(
  () => import('@/components/row/components/DynamicMap'),
  { ssr: false }
);

const page = () => {
  return (
    <div className='flex flex-col gap-4 pb-24'>
        <CategoryShowcase categoryName='Beach' />
        <CategoryShowcase categoryName='Modern' />
        <CategoryShowcase categoryName='Countryside' />
        <CategoryShowcase categoryName='Islands' />
        <Counter name='Adults' />
        <Counter name='Children' />
        <Counter name='Infants' />
        <div className="mt-4">
          <DynamicMap locationValue="GB" />
        </div>
        <CreationBottomBar />
    </div>
  )
}

export default page