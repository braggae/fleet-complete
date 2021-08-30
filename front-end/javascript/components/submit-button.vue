<template>
  <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm text-light"
            role="status">
          <span class="visually-hidden">Loading...</span>
        </span>
    <span v-else>GO</span>
  </button>
</template>

<script>
export default {
  name: "submit-button",
  props: {
    isLoading: Boolean,
  }
}
</script>

<style scoped>

</style>