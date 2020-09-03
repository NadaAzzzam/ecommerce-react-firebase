import firebase from 'firebase';
import 'firebase/auth'
import  'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3A4wEXLXHqLBKqW4AAXkixMEODXbin8U",
  authDomain: "ecom-react-43634.firebaseapp.com",
  databaseURL: "https://ecom-react-43634.firebaseio.com",
  projectId: "ecom-react-43634",
  storageBucket: "ecom-react-43634.appspot.com",
  messagingSenderId: "471081181070",
  appId: "1:471081181070:web:b2ca352305d25f996b0edf",
  measurementId: "G-PX2K7GVTGD"
};


class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    // firebase.firestore().settings({timestampsInSnapshots:true})
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.firDB = firebase.database().ref();
  }

  async login(emial, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(emial, password).catch(err => {
      console.log(err)
      return err
    })
    return user;
  }
  async signin(newUser) {

    const user = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .catch(err => {
        console.log(err)
        return err
      })
    return user;
  }
  async logout() {
    const logout = await firebase.auth().signOut().catch(err => {
      console.log(err)
      return err
    })
    return logout;
  }
  async getUserState() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    })
  }
}



export default new Firebase();