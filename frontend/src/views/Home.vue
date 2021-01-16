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
    idToken: 'none'
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      this.idToken = idToken;
      // redirect to vote
    },
    OnGoogleAuthFail(error) {
      console.log(error);
      this.idToken = 'none';
      // show error modal
    },
    OnGoogleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      
    },

    sendVote(choice) {
      voteObj = {
        measureID: 1,
        vote: choice
      }
      axios.post("", [this.idToken, voteObj])
        .then(response => {
          // show current results
        })
        .catch(error => {
          // show error modal
        });
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>