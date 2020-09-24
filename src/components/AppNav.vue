<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded :to="'/'">Home</v-btn>
    <v-btn v-if="!signedIn" text rounded :to="'/login'">Login</v-btn>
    <v-btn v-if="signedIn" text rounded :to="'/dashboard'">Dashboard</v-btn>
    <v-btn v-if="signedIn" text rounded @click="signOut">Sign Out</v-btn>
  </v-app-bar>
</template>

<script>
// TODO
// # AppNav 메뉴 보이는 상태
// 1. 로그인 - 일반 유저
// 2. 로그인 - Admin
// 3. 로그아웃
// 4. requiresAuth

// # 리팩토링
// 1. login? signIn?
// 2. logOut? signOut?

export default {
  computed: {
    signedIn() {
      return this.$store.getters['auth/signedIn']
    },
  },
  methods: {
    signOut() {
      console.log('signOut')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
