<template>
	<v-card width="400" class="mx-auto mt-5">
		<v-card-title>
			<h1 class="display-1">Login</h1>
		</v-card-title>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			@submit.prevent="onSignin"
		>
			<v-card-text>
				<v-text-field
					label="Email"
					type="email"
					v-model="email"
					:rules="emailRules"
					prepend-icon="mdi-account-circle"
				/>
				<v-text-field
					label="Password"
					:type="showPassword ? 'text' : 'password'"
					v-model="password"
					:rules="passwordRules"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn color="success">Register</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="info" type="submit" :loading="loading">Login</v-btn>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			valid: true,
			showPassword: false,
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required',
				v =>
					(v && v.length <= 10) || 'Password must be less than 10 characters',
			],
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		error() {
			return this.$store.getters.error;
		},
		loading() {
			return this.$store.getters.loading;
		},
	},
	methods: {
		onSignin() {
			console.log('onSignin');
			this.validate();
			// 0. submit 이벤트로 이곳에 진입해야 한다.
			// 1. 입력폼의 데이터들의 유효성을 검사한다.
			// 2. 데이터가 유효하다면 로그인을 진행한다.
			/*
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
			});
			*/
		},
		onDismissed() {
			this.$store.dispatch('clearError');
		},
		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
		resetValidation() {
			this.$refs.form.resetValidation();
		},
	},
};
</script>

<style></style>
