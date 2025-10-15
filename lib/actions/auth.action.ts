'use server';
'use server';

import { auth, db } from '@/firebase/admin'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { cookies } from 'next/headers';


const ONE_WEEK = 60 * 60 * 24 * 7;

type SignUpResult = {
  success: boolean;
  message: string;
};

export async function SignUp(params: SignUpParams): Promise<SignUpResult> {
  const { uid, name, email } = params;

  try {
    const userRef = doc(db, 'users', uid);
    const userRecord = await getDoc(userRef);

    if (userRecord.exists()) {
      return {
        success: true,
        message: 'Account already exists please sign in instead',
      };
    }

    await setDoc(userRef, { name, email });

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (e: any) {
    console.error('Error creating a user:', e);

    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use',
      };
    }

    return {
      success: false,
      message: 'Failed to create an account',
    };
  }
}

export async function SignIn(params: SignInParams): Promise<{ success: boolean; message: string }> {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an account instead.',
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Logged in successfully',
    };
  } catch (e: any) {
    console.log(e);

    return {
      success: false,
      message: 'Failed to log into an account',
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}
