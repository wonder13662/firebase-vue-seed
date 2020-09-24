import * as firebase from 'firebase'

// TODO 0. Authentication
// TODO 1. Realtime Database
// TODO 2. Cloud Firestore

const module = {
  init() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVC2hf2XrtzbLpSa_BE0BtmCKaxNYvnxk',
      authDomain: 'playground-9a00c.firebaseapp.com',
      databaseURL: 'https://playground-9a00c.firebaseio.com',
      projectId: 'playground-9a00c',
      storageBucket: 'playground-9a00c.appspot.com',
      messagingSenderId: '140017567845',
      appId: '1:140017567845:web:e20c8175c58a29533d9e8c',
      measurementId: 'G-EYJZZMVJPX',
    })
  },
  async createUserWithEmailAndPassword({ email, password }) {
    // TODO 유저의 추가 정보를 넣을 수 있도록 해야 함
    // TODO 여러 명의 유저들을 한꺼번에 넣으려면?
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      return await Promise.resolve()
    } catch (err) {
      return await Promise.reject(err)
    }
  },
  async signInWithEmailAndPassword({ email, password }) {
    try {
      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      console.log('auth:', auth)
      return await Promise.resolve()
    } catch (err) {
      return await Promise.reject(err)
    }
  },
  async signOut() {
    try {
      await firebase.auth().signOut()
      return await Promise.resolve()
    } catch (err) {
      return await Promise.reject(err)
    }
  },
  onAuthChanged(callback) {
    firebase.auth().onAuthStateChanged((user) => callback(user))
  },
}

export default module
