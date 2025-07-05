'use client';

import Image from 'next/image';

const AppHero = () => {
  return (
    <section className="relative h-[65vh] md:h-[85vh]">
      {/* Top gradient overlay */}
      <div className="absolute z-10 w-full bg-gradient-to-b from-black/30 to-transparent h-28" />
      
      {/* Hero image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="hero"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="max-w-[350px] text-2xl md:text-3xl xl:text-4xl font-bold text-center text-gray-500 px-4">
          Not sure where to go? Perfect.
        </h1>
        <button className="mt-4 px-8 py-2 sm:py-3 bg-primary text-white text-sm md:text-base font-medium rounded-md hover:shadow-xl active:scale-90 transition-all duration-150">
          I&apos;m flexible
        </button>
      </div>
    </section>
  );
};

export default AppHero;
