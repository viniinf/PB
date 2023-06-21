import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyAVwfgDRrb22Patm4-TMv9WwYHkQIv3DIM",

  authDomain: "pbtp5-c36f6.firebaseapp.com",

  projectId: "pbtp5-c36f6",

  storageBucket: "pbtp5-c36f6.appspot.com",

  messagingSenderId: "39700296617",

  appId: "1:39700296617:web:f997b8ffc727f68984cab8",

  measurementId: "G-QE4N5RKXW5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore as db };