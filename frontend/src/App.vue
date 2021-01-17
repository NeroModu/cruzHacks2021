<template>
  <div>
    <v-app>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <v-btn
          href="/"
          text
        >
          <span class="mr-2">Vaas</span>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/NeroModu/cruzHacks2021"
          target="_blank"
          text
        >
          <span class="mr-2">Source Code</span>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
