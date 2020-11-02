<template>
  <div></div>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a #, and an existing id
    return /^\d+$/.test(params.id);
  },
};
</script>

<style></style>
