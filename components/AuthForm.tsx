'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
// import { Sign } from 'crypto';
import { SignIn, SignUp } from '@/lib/actions/auth.action';



// defined form type here 

type FormType = 'sign-in' | 'sign-up';

// schema of the form 

const authFormSchema = (type: FormType) => {
  return z.object({
    Name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    Email: z.string().email(),
    Password: z.string().min(3),
  });
};


const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Email: '',
      Password: '',
    },
  });

  const isSignIn = type === 'sign-in';

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    if (type === 'sign-up') {
      const { Name, Email, Password } = values; 

      // Create user with Firebase Auth
      const userCredentials = await createUserWithEmailAndPassword(auth, Email, Password);

      const result = await SignUp({
        uid: userCredentials.user.uid,
        name: Name!,
        email: Email,
        password: Password,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Account created successfully. Please sign in.');
      router.push('/sign-in');
    } else {
        const { Email, Password } = values;

        const userCredentials = await signInWithEmailAndPassword(auth , Email, Password)
        
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken ){
          toast.error('sign in failed ')
          return;
        }

        await SignIn({
          email: Email,
          idToken,
        });


      toast.success('Signed in successfully.');
      router.push('/');
    }
  } catch (error: any) {
    console.log(error);
    toast.error(`There was an error: ${error.message || error}`);
  }
};


  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
        </div>
        <h1 className="text-light-100 font-semibold text-lg">PitchPerfect</h1>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="Name"
                label="Name"
                placeholder="Your name"
              />
            )}

            <FormField
              control={form.control}
              name="Email"
              label="Email"
              placeholder="your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="Password"
              label="Password"
              placeholder="Your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? 'Sign IN' : 'CREATE AN ACCOUNT'}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Already have an account?'}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
