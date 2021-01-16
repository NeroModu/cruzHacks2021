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
    <v-btn
        depressed
        color="primary"
        @click="OnGoogleSignOut"
      >
      SIgnout
    </v-btn>
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
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken)
      axios.post("", idToken)
        .then(response => {
          // redirect to vote
        })
        .catch(error => {
          // sign out & error modal
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error)
    },
    OnGoogleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      
    },


  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>