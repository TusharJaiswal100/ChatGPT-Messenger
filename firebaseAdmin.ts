import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// const serviceAccount = require("./serviceAccountKey.json");

const serviceAccount = JSON.parse(  // JSON.parse converts data to js object
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string // here written as string becuase we are passing string to server
);

if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

const adminDb = admin.firestore();

export {adminDb}; // with this we can make admin call from backend with zero permission