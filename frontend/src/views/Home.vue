<template>
  <div class="home">
    <div id="signedOutView" v-show="!signedIn">
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

    <div id="signedInView" >
      <div>
        <v-btn
          depressed
          color="primary"
          @click="sendVote(true)"
        >
          Cast Votes
        </v-btn>
      </div>
      <v-card 
        elevation="2"
        class="mx-auto vaas-card"
        max-width="500"
      >
        <v-card-title>
          MEASURE {{measureInfo.ID}}
        </v-card-title>

        <v-card-subtitle>
          {{measureInfo.subheader}}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            color="orange lighten-2"
            text
          >
            Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="measureInfo.show = !measureInfo.show"
          >
            <v-icon>{{ measureInfo.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="measureInfo.show">
            <v-divider></v-divider>

            <v-card-text style="white-space: pre-wrap;">
              {{measureInfo.info}}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import {measures} from '../measures'
import {keys} from '../keys'

export default {
  name: 'Home',
  data: () => ({
    clientID: keys.clientID,
    idToken: 'none',
    signedIn: false,

    ballot: [
      {measureID: 24, vote: null},
      {measureID: 25, vote: null},
      {measureID: 26, vote: null},
    ],

    measureInfo: measures[0]
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      this.idToken = idToken;
      this.signedIn = true;
      // redirect to vote
    },
    OnGoogleAuthFail(error) {
      console.log(error);
      this.idToken = 'none';
      this.signedIn = false;
      // show error modal
    },
    OnGoogleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        this.idToken = 'none';
        this.signedIn = false;
      });
      
    },

    sendVote(choice) {
      let send = {
        token: this.idToken,
        result: this.ballot
      }
      axios.post(keys.URL + 'verifyandvote', send)
        .then(response => {
          // show current results
          console.log(response);
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

.vaas-card {
  text-align: left;
}
</style>