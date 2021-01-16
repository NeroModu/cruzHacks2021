<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  text-align: center;
}
</style>