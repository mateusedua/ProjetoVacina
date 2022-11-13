import AsyncStorage from '@react-native-async-storage/async-storage' ;   
import { initializeApp} from "firebase/app";
import { initializeAuth,getReactNativePersistence} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDihcMZYI2_bxBKeav9SE4KgeoqufMF2_0",
  authDomain: "projetoweb-2be2f.firebaseapp.com",
  projectId: "projetoweb-2be2f",
  storageBucket: "projetoweb-2be2f.appspot.com",
  messagingSenderId: "26834184215",
  appId: "1:26834184215:web:76391d741e09397bfd9452"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  

const db = initializeFirestore(app,{experimentalForceLongPolling: true})

const storage = getStorage(app)

export{app,auth,db,storage};