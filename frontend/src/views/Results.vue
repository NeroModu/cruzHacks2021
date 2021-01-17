<template>
  <div class="results">
    <v-card
      style="margin: 20px"
      class="mx-auto"
      max-width="700"
    >
      <v-img
        src="https://cdn-images-1.medium.com/fit/t/1600/480/0*8p6_64QvLPCgu8dW.png"
        height="100px"
      ></v-img>

      <v-card-title style="font-size: 40px">
        Results
      </v-card-title>
            
      <span style="float: right; margin-top: 10px">
        <a href="https://kovan.etherscan.io/address/0x32078e498ce709b708230311c5f0dc5da89bacde" 
          target="_blank" style="text-decoration: none">
          <v-btn
            color="primary"
            text
          >
            View Contract
          </v-btn>
        </a>
      </span>

      <v-card-title>
        Measure {{measureInfo.ID}}
      </v-card-title>

      <v-card-subtitle>
        {{measureInfo.subheader}}
      </v-card-subtitle>

      <div style="padding: 15px">
        <div style="font-weight: bold; margin-bottom: 5px">
          <span style="color: green">
            YES {{yTxt}}
          </span>
          <span style="float: right; color: red">
            NO {{nTxt}}
          </span>
        </div>
        <div>
          <v-progress-linear
            v-show="!loaded"
            indeterminate
            background-color="red"
            color="green"
          ></v-progress-linear>
          <v-progress-linear
            v-show="loaded"
            background-color="red"
            color="green"
            :value="yesPercentage"
          ></v-progress-linear>
        </div>
        <div style="text-align: center; color: gray" v-show="!loaded">
          FETCHING RESULTS FROM THE CONTRACT ON THE BLOCKCHAIN...
        </div>
      </div>


    </v-card>
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
    measureInfo: measures[0],

    loaded: false,
    noPercentage: 0,
    yesPercentage: 0,

    yTxt: "",
    nTxt: ""

  }),
  methods: {
  },

  created() {
    axios.get(keys.URL + 'results')
      .then(response => {
        this.loaded = true;

        let yes = response.data.yes;
        let no = response.data.no;

        this.yesPercentage = (yes / (yes + no) * 100).toFixed(1);
        this.noPercentage = (no / (yes + no) * 100).toFixed(1);

        this.yTxt = "- " + this.yesPercentage + "%";
        this.nTxt = "- " + this.noPercentage + "%";
      })
      .catch(error => {
        // show error modal
      });

  }
}
</script>