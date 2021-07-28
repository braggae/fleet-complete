<template>
  <form
      @submit.prevent="onSubmit"
      class="row g-3"
      id="api-key-form"
      v-bind:class="{ 'was-validated': wasValidated }"
      novalidate
  >
    <div class="input-group has-validation">
      <label for="api-key" class="input-group-text">API key</label>
      <input
          type="text"
          class="form-control"
          id="api-key"
          name="api-key"
          v-model="token"
          placeholder="(api key goes here)"
          required
      >
      <input type="submit" class="btn btn-primary" value="GO">
      <div class="invalid-feedback">
        {{ this.error }}
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "api-token-form",
  data() {
    return {
      token: null,
      error: null,
      wasValidated: false,
    }
  },
  methods: {
    async onSubmit() {
      if (!this.token) {
        this.error        = 'Please fill in the API token';
        this.wasValidated = true;
        return;
      }

      this.wasValidated = false;
      this.error        = null;
      const res         = await this.fetchData();
      console.log(res);

    },
    async fetchData() {
      const res = await fetch('vehicles', {
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': this.token,
        },
      });
      console.log(res)
      return res.json();
    },
  },
}
</script>

<style scoped>

</style>