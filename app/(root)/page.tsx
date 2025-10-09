'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
const Homepage = () => {
  return (
    <>
    <section
      className="card-cta flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 py-12 md:px-12 lg:px-20"
    >
     
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-lg">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          Practice on real interview questions and get instant feedback
        </p>
        <Button asChild className="btn-primary w-full sm:w-auto px-6 py-3 text-lg">
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>

      
      <div className="flex justify-center lg:justify-end w-full lg:w-auto">
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="w-64 sm:w-80 md:w-96 h-auto object-contain"
        />
      </div>
    </section>

     <section className='flex flex-col  gap-6 mt-8'> 
      <h2>Your Interviews</h2>

      <div className='interviews-section'>
            {dummyInterviews.map((interview) => (
                  <InterviewCard {...interview} />
              ))}
            {/* <p>You haven't taken any interviews yet </p> */}
      </div>
    </section>

    <section className='flex flex-col  gap-6 mt-8'> 
      <h2>Take an interview</h2>

      <div className='interviews-section'>
          <div className='interviews-section'>
            
            {dummyInterviews.map((interview) => (
                  <InterviewCard {...interview} />
              ))}

        </div>
      </div>
    </section>
    </>
  );
};

export default Homepage;
