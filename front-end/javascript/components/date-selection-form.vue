<template>
  <form
      @submit.prevent="onSubmit"
      class="row g-3"
      id="date-selection-form"
      v-if="canDisplayForm()"
      novalidate
  >
    <div class="input-group has-validation">
      <label for="selected-date" class="input-group-text">Date:</label>
      <input
          type="date"
          class="form-control"
          id="selected-date"
          name="selected-date"
          v-model="date"
          placeholder="(api key goes here)"
          v-bind:class="{ 'is-invalid': isInvalid }"
          required
      >
      <input type="submit" class="btn btn-primary" value="GO">
      <div class="invalid-feedback">
        {{ this.error }}
      </div>
    </div>
  </form>
  <div
      v-else
      class="alert alert-secondary"
      role="alert">
    Please select a vehicle to see more data.
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "date-selection-form",
  props: {
    apiToken: String,
    activeVehicle: Object,
  },
  data() {
    return {
      date: null,
      error: null,
      isInvalid: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isInvalid = false;
      this.error     = null;

      const res = await this.fetchData();
      console.log(res);
      switch (res.status) {
        case 200:
          this.$emit('vehicle-list-update', await res.data);
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
    canDisplayForm() {
      return this.apiToken && this.activeVehicle?.objectId;
    },
    async fetchData() {
      return axios.get('vehicle-route-data', {
        params: {
          date: this.date,
          objectId: this.activeVehicle.objectId,
        },
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': this.apiToken,
        },
      });
    },
  },
}
</script>

<style scoped>

</style>