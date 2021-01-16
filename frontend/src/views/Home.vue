<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <button v-google-signin-button="clientID">
      <v-btn
        depressed
        color="primary"
      >
        <v-icon
          dark
          left
        >
          mdi-google
        </v-icon>
        Sign In
      </v-btn>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    clientID: '910587914066-a79tgllt99stia0bqfihhhbf4vb3u812.apps.googleusercontent.com',
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>