"use strict";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize the Admin SDK only once (avoid "app already exists" errors)
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const auth = getAuth();
const db = getFirestore();

export { auth, db };



// const initFirebaseAdmin = () => {
//     // const apps = getApps() ;


//     // if(!apps.length ){
//     // }

//     return {
//     auth: getAuth(),
//     db: getFirestore(),
//   }
// }

// export const{ auth , db} = initFirebaseAdmin();
