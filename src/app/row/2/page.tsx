'use client';

import { ListingCard } from '@/components/row/components/ListingCard'
import { Navbar } from '@/components/row/components/Navbar'
import { NoItems } from '@/components/row/components/NoItem';
import { RichTextEditor } from '@/components/row/components/RichTextEditor';
import { SearchModalCompnent } from '@/components/row/components/SearchComponent';
import { SelectCalender } from '@/components/row/components/SelectCalender';
import React, { useState } from 'react'

const page = () => {
  const [content, setContent] = useState('');
  const [reservation] = useState([{
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }]);

  return (
    <div>
        <ListingCard 
          imagePath="/assets/search/013c9377-349f-418b-8d4c-15f923234a5f.webp"
          description="Luxury Villa with Ocean View"
          location="Malibu, CA"
          price={850}
          homeId="123"
        />
        <Navbar />
        <NoItems title="No items found" description="Try adjusting your search or filter to find what you're looking for." />
        <RichTextEditor value={content} onChange={setContent} />
        <SearchModalCompnent />
        <SelectCalender reservation={reservation} />
    </div>
  )
}

export default page