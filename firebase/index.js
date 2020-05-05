// Your web app's Firebase configuration
import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBfhiy7EVdQQlr54gyKSj9Ahy4PElctPVM',
  authDomain: 'dolos-1.firebaseapp.com',
  databaseURL: 'https://dolos-1.firebaseio.com',
  projectId: 'dolos-1',
  storageBucket: 'dolos-1.appspot.com',
  messagingSenderId: '137439467118',
  appId: '1:137439467118:web:423bf732e9757370e0b87f',
  measurementId: 'G-MBGZJGZNGQ'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export const db = firebase.firestore()
export default firebase
