"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StepHeader, StepNavigation } from '@/components/host';

interface AboutPlaceProps {
  params: Promise<{ id: string }>;
}

const AboutPlace = ({ params }: AboutPlaceProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>('');
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Auto-play video when component mounts
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Auto-play was prevented:', error);
      });
    }
  }, []);

  const handleBack = () => {
    router.push('/host/overview');
  };

  const handleNext = () => {
    router.push(`/host/${id}/structure`);
  };

  const illustration = (
    <div className="w-full bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-2xl"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          // Ensure video plays after loading
          if (videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log('Video play failed:', error);
            });
          }
        }}
      >
        <source
          src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-48 h-48 bg-white/20 rounded-2xl mx-auto mb-4 relative">
              <div className="absolute inset-4 bg-white/20 rounded-xl"></div>
              <div className="absolute inset-8 bg-white/20 rounded-lg"></div>
            </div>
            <p className="text-sm">3D House Cross-Section</p>
          </div>
        </div>
      </video>
    </div>
  );

  return (
    <div className="">
      <div className="">
        <StepHeader
          stepNumber={1}
          title="Tell us about your place"
          description="In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay."
          illustration={illustration}
        />
      </div>

      <StepNavigation
        onBack={handleBack}
        onNext={handleNext}
        backLabel="Back"
        nextLabel="Next"
      />
    </div>
  );
};

export default AboutPlace; 