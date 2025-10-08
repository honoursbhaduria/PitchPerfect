import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Homepage = () => {
  return (
    <>
    <section  className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>
          Get Interview-Ready with AI-Powered Practice & Feedback
        </h2>
        <p className='text-lg'>
          Practice on real interview questions and get instant feedback 
        </p>
      </div>
      <Button asChild className='btn-primary max-sm:w-full '>
        <Link href='/interview'>Start an Interview </Link>
      </Button>
    </section>
    
    </>
  )
}

export default Homepage