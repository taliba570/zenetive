import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
