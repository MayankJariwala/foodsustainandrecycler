import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCs_6z8LeAw8dYd3F3Q9i4XwCS1m9UOmh0',
    authDomain: 'brave-terra-259222.firebaseapp.com',
    databaseURL: 'https://brave-terra-259222.firebaseio.com/',
    projectId: 'brave-terra-259222',
    storageBucket: 'https://console.firebase.google.com/project/brave-terra-259222/storage/brave-terra-259222.appspot.com/files',
    messagingSenderId: '595762824121',
};

const Firebase = firebase.initializeApp(config,"ReduceWaste");
export default Firebase;
