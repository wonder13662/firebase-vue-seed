import * as firebase from 'firebase';

// 1. Realtime Database
// 2. Cloud Firestore

const module = {
	setUser(user) {
		const userListRef = firebase.database().ref('presence');
		const myUserRef = userListRef.push();

		firebase
			.database()
			.ref('.info/connected')
			.on('value', snap => {
				if (snap.val()) {
					// if we lose network then remove this user from the list
					myUserRef.onDisconnect().remove();
					// set user's online status
					let presenceObject = { user, status: 'online' };
					myUserRef.set(presenceObject);
				} else {
					// client has lost network
					let presenceObject = { user, status: 'offline' };
					myUserRef.set(presenceObject);
				}
			});
	},
	async createUserWithEmailAndPassword({ email, password, username }) {
		try {
			const auth = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await firebase
				.database()
				.ref('users')
				.child(auth.user.uid)
				.set({
					name: username,
				});
			this.setUser({
				id: auth.user.uid,
				username: username,
			});
			return await Promise.resolve();
		} catch (err) {
			return await Promise.reject(err);
		}
	},
	async signInWithEmailAndPassword({ email, password }) {
		try {
			const auth = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			await firebase
				.database()
				.ref('users')
				.child(auth.user.uid)
				.once('value', () => {
					this.setUser({
						id: auth.user.uid,
						username: auth.user.email, // TODO 왜 이메일로 설정될까? username이어야 할 것 같은데...
					});
				});
			return await Promise.resolve();
		} catch (err) {
			return await Promise.reject(err);
		}
	},
};

export default module;
