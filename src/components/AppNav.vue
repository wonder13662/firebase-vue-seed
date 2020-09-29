<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded :to="'/'">Home</v-btn>
    <v-btn v-if="!signedIn" text rounded :to="'/login'">Login</v-btn>
    <v-btn v-if="signedIn" text rounded :to="'/dashboard'">Dashboard</v-btn>
    <v-btn v-if="signedIn" text rounded :to="'/excel'">Excel</v-btn>
    <v-btn v-if="signedIn" text rounded @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
// TODO
// # AppNav 메뉴 보이는 상태
// (완료)1. 로그인 - 일반 유저
// 2. 로그인 - Admin
// (완료)3. 로그아웃
// (완료)4. requiresAuth

// # 리팩토링
// 1. login? signIn? -> logIn
// 2. logOut? signOut? -> logOut

export default {
  computed: {
    signedIn() {
      return this.$store.getters['auth/signedIn']
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log('error:', error)
        })

    },
  },
}
</script>

<style lang="scss" scoped>

</style>
