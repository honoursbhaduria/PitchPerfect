"use server";
import { auth, db } from '@/firebase/admin';
import { CollectionReference, DocumentReference } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';
import { use } from 'react';
import { Doc } from 'zod/v4/core';


const ONE_WEEK = 60 * 60 * 24 * 7;

type SignUpResult = {
  success: boolean;
  message: string;
};

export async function SignUp(params: SignUpParams): Promise<SignUpResult> {
  const { uid, name, email } = params;

  try {
    const userRef = db.collection('users').doc(uid);
    const userRecord = await userRef.get();

    if (userRecord.exists) {
      return {
        success: true,
        message: 'Account already exists please sign in instead',
      };
    }

    await userRef.set({ name, email });

    return {
      success: true,
      message: 'Account created successfully please sign in ',
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
  const cookieStore = (await cookies()) as any;

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


// export async function getCurrentUser(): Promise<User | null> {
//     const cookieStore = await cookies();

//     const sessionCookie = cookieStore.get('session')?.value;

//     if (!sessionCookie) return null;

//     try {
//         const decodedClaims = await auth.verifySessionCookie(sessionCookie , true);


//         const userRecord = await db.collection('users') as CollectionReference<DocumentData, DocumentData>;
//         .doc(decodedClaims.uid) as DocumentReference<DocumentData, DocumentData>;

//         if (!userRecord.exists) return null;

//         return {
//           ...userrecord
//         }
// }

//     } catch (e) {
//         console.log('Error verifying session cookie:', e);
//         return null;
//     }

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Read the user document from Firestore (admin SDK)
    const userRef = db.collection('users').doc(decodedClaims.uid);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) return null;

    return {
      ...(userSnapshot.data() as any),
      id: userSnapshot.id,
    } as User;
  } catch (e) {
    console.log(e);
    return null;
  }
}



export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}