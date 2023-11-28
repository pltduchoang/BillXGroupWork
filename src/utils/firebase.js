// import { AppRegistry } from 'react-native';
// import App from '../../App';
// import { name as appName } from '../../app.json';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// import {
//   NEXT_PUBLIC_FIREBASE_API_KEY,
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   NEXT_PUBLIC_FIREBASE_APP_ID,
// } from '@env';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Set AsyncStorage for Firebase Auth persistence
// const auth = getAuth(app);
// initializeAuth(auth, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// // Export Firebase auth and Firestore instances
// export const db = getFirestore(app);
// export { auth }; // Export the initialized auth instance

// // Register the app component
// AppRegistry.registerComponent(appName, () => App);
