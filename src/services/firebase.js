import * as firebase from 'firebase'

// TODO 0. Authentication
// TODO 1. Realtime Database
// TODO 2. Cloud Firestore

export default {
  db:null,
  functions:null,
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

    this.db = firebase.firestore()
    this.functions = firebase.functions()

    // https://firebase.google.com/docs/reference/js/firebase.functions.Functions#usefunctionsemulator
    // 로컬 작업시에는 에뮬레이터로 확인
    if(window.location.hostname === 'localhost') {
      this.functions.useFunctionsEmulator('http://localhost:5001')
    }
  },
  // firebase functions example
  async echo(message) {
    const func = firebase.functions().httpsCallable('echo')
    try {
      const result = await func({ message })
      console.log('result.data: ', result.data)
    } catch(error) {
      // const code = error.code;
      // const message = error.message;
      // const details = error.details;
      console.log('error:', error)
    }
  },
  async createUserWithEmailAndPassword({ email, password }) {
    if(!email) {
      return await Promise.reject(new Error('Email is not valid'))
    }
    if(!password) {
      return await Promise.reject(new Error('Password is not valid'))
    }

    // TODO 유저의 추가 정보를 넣을 수 있도록 해야 함
    // TODO 여러 명의 유저들을 한꺼번에 넣으려면?
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      return await Promise.resolve()
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  async createUserInfo({ email, firstName, lastName, group, team }) {
    if(!email) {
      return await Promise.reject(new Error('Email is not valid'))
    }
    if(!firstName) {
      return await Promise.reject(new Error('firstName is not valid'))
    }
    if(!lastName) {
      return await Promise.reject(new Error('lastName is not valid'))
    }
    if(!group) {
      return await Promise.reject(new Error('group is not valid'))
    }
    if(!team) {
      return await Promise.reject(new Error('team is not valid'))
    }

    const userInfo = {
      email,
      firstName,
      lastName,
      group,
      team,
    }
    try {
      const docRef = await this.db.collection('users').add(userInfo)
      return await Promise.resolve(docRef)
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  async signInWithEmailAndPassword({ email, password }) {
    try {
      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      console.log('auth:', auth)
      return await Promise.resolve()
    } catch (error) {
      return await Promise.reject(error)
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
