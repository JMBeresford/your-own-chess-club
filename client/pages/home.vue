<template>
  <b-container id="home" fluid>
    <Header />
    <div id="games">
      <MyGames />
      <QuickPlay />
    </div>
  </b-container>
</template>

<script>
export default {
  middleware: "validate",
  created() {
    this.$store.dispatch("queryUsers");
  },
};
</script>

<style>
body {
  background-color: var(--light);
}
#games {
  text-align: center;
}
</style>
