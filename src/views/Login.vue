<template>
	<v-card width="400" class="mx-auto mt-5">
		<v-card-title>
			<h1 class="display-1">Login</h1>
		</v-card-title>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			@submit.prevent="onLogin"
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
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    onLogin() {
      this.validate()
      if(this.valid) {
        this.$store
          .dispatch('auth/login', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push({ name: 'dashboard' })
          })
          .catch((error) => {
            console.log('error:', error)
          })
      }
    },
    onDismissed() {
      this.$store.dispatch('network/clearError')
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style></style>
