import * as firebase from 'firebase'

// TODO 0. Authentication
// TODO 1. Realtime Database
// TODO 2. Cloud Firestore

const module = {
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
  onAuthChanged(callback) {
    firebase.auth().onAuthStateChanged((user) => callback(user))
  },
}

export default module
