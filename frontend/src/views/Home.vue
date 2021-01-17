<template>
  <div class="home">
    <div id="signedOutView" class="vaas-bg" v-show="!signedIn">
      <div class="vaas-heading">
        Voting-as-a-Service
        <p style="font-size: 20px">
          Using smart contracts on the Ethereum blockchain, VaaS provides a platform for highly secure, audible, transparent, and distributed inter-organization voting all while keeping the identity of those who voted private.
        </p>
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

      <div>
        <v-img
          src="../assets/undraw_voting.svg"
          width="450px"
          style="margin-left: 100px"
        ></v-img>
      </div>
    </div>

    <div id="signedInView" v-show="signedIn">
      <div style="margin-bottom: 30px; margin-top: 10px; color: gray">
        Organization: UCSC
      </div>
      <h2 style="margin-bottom: 20px">
        Available Measures
      </h2>
      <v-card 
        style="margin-bottom: 10px"
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
            icon
            @click="measureInfo.show = !measureInfo.show"
          >
            <v-icon>{{ measureInfo.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <a href="https://kovan.etherscan.io/address/0x32078e498ce709b708230311c5f0dc5da89bacde" 
             target="_blank" style="text-decoration: none;">
            <v-btn
              color="primary"
              text
            >
              View Contract
            </v-btn>
          </a>

          <v-spacer></v-spacer>

          <v-btn
            v-show="(ballot[0].vote === null || !ballot[0].vote)"
            @click="ballot[0].vote = true"
            color="green lighten-2"
            text
          >
            Yes
          </v-btn>
          <v-btn
            v-show="(ballot[0].vote !== null && ballot[0].vote)"
            color="green lighten-2"
            depressed
          >
            Yes
          </v-btn>
          <v-btn
            v-show="(ballot[0].vote === null || ballot[0].vote)"
            @click="ballot[0].vote = false"
            color="red lighten-2"
            text
          >
            No
          </v-btn>
          <v-btn
            v-show="(ballot[0].vote !== null && ballot[0].vote === false)"
            color="red lighten-2"
            depressed
          >
            No
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

      <div>
        <v-btn
          style="margin-bottom: 20px"
          depressed
          color="primary"
          @click="sendVote(true)"
        >
          Cast Votes
        </v-btn>
      </div>
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
      this.idToken = idToken;
      this.signedIn = true;
    },
    OnGoogleAuthFail(error) {
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
          console.log(error);
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

.vaas-heading {
  margin: 50px;
  margin-top: 0px;
  font-size: 5em;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.vaas-bg {
  background-image: url('https://i.imgur.com/IGtqYwB.png');
  background-size: cover;
}
</style>