// import firebase from "firebase/app"
// import "firebase/firestore"
// import "firebase/storage"

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

// const firestore = app.firestore()
// export const database = {
//   folders: firestore.collection('folders'),
//   files: firestore.collection('files'),
//   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   formattedDoc: doc => {
//     return {
//       id: doc.id,
//       ...doc.data()
//     }
// }
// }
// export const storage = app.storage()
// export default app

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const database = {
  folders: collection(db,'folders'),
  files: collection(db, 'files'),
  getCurrentTimestamp: serverTimestamp,
  formattedDoc: doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
}
}
export const storage = getStorage();
