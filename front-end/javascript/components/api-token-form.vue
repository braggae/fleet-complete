<template>
  <form
      @submit.prevent="onSubmit"
      class="row g-3"
      id="api-key-form"
      novalidate
  >
    <div class="input-group has-validation">
      <label for="api-key" class="input-group-text">API key:</label>
      <input
          type="text"
          class="form-control"
          id="api-key"
          name="api-key"
          v-model="token"
          placeholder="(api key goes here)"
          v-bind:class="{ 'is-invalid': isInvalid }"
          required
      >
      <submit-button :is-loading="isLoading"></submit-button>
      <div class="invalid-feedback">
        {{ this.error }}
      </div>
    </div>
  </form>
</template>

<script>
import submitButton from './submit-button';

export default {
  name: "api-token-form",
  components: {
    submitButton,
  },
  data() {
    return {
      token: null,
      error: null,
      isInvalid: false,
      isLoading: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.isLoading) return;

      this.isInvalid = false;
      this.error     = null;

      if (!this.token) {
        this.error     = 'Please fill in the API token';
        this.isInvalid = true;
        return;
      }

      this.isLoading = true;
      const res      = await this.fetchData();
      this.isLoading = false;
      switch (res.status) {
        case 200:
          this.$emit('vehicle-list-update', await res.json(), this.token);
          break;
        case 401:
          this.error     = 'Invalid API token';
          this.isInvalid = true;
          break;
        default:
          this.error     = 'Unknown error';
          this.isInvalid = true;
      }
    },
    async fetchData() {
      return fetch('vehicles', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': this.token,
        },
      });
    },
  },
}
</script>

<style scoped>
#api-key-form {
  max-width: 500px;
}
</style>