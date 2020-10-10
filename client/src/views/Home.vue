<template>
  <div id="app">
    <MyGames />
    <QuickPlay />
  </div>
</template>

<script>
import QuickPlay from '../components/QuickPlay.vue';
import MyGames from '../components/MyGames.vue';

export default {
  name: 'App',
  components: {
    QuickPlay,
    MyGames
  },
}
</script>

<style>
  
</style>
