import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAws3eS4-VkD3MSW-5BZPVTsjcN4znGSJE',
  authDomain: 'liion-c9560.firebaseapp.com',
  databaseURL: 'https://liion-c9560.firebaseio.com',
  projectId: 'liion-c9560',
  storageBucket: 'liion-c9560.appspot.com',
  messagingSenderId: '493652029722',
  appId: '1:493652029722:android:217c633a2b35791a447ca3',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
