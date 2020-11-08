<template>
  <b-container id="profile" fluid>
    <Header />
    <b-row>
      <h3>{{ this.$auth.user.username }}</h3>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style></style>
