<template>
  <div v-if="canDisplayForm()" class="mb-3">
    <form
        @submit.prevent="onSubmit"
        class="row g-3"
        id="date-selection-form"
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
            :max="new Date()"
            v-bind:class="{ 'is-invalid': isInvalid }"
            required
        >
        <submit-button :is-loading="isLoading"></submit-button>
        <div class="invalid-feedback">
          {{ this.error }}
        </div>
      </div>
    </form>
  </div>
  <div
      v-else
      class="alert alert-secondary"
      role="alert">
    Please select a vehicle to see more data.
  </div>
</template>

<script>
import axios        from 'axios';
import submitButton from "./submit-button";

export default {
  name: "date-selection-form",
  components: {
    submitButton,
  },
  props: {
    apiToken: String,
    activeVehicle: Object,
  },
  data() {
    return {
      date: null,
      error: null,
      isInvalid: false,
      isLoading: false,
    };
  },
  mounted() {
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
    }
  },
  watch: {
    date(newDate) {
      sessionStorage.date = newDate;
    }
  },
  methods: {
    async onSubmit() {
      if (this.isLoading) return;

      this.isInvalid = false;
      this.error     = null;

      this.isLoading = true;
      let res;
      try {
        res = await this.fetchData();
      } catch (err) {
        this.error     = 'Unknown error';
        this.isInvalid = true;
        this.isLoading = false;
        return;
      }

      this.isLoading = false;
      this.$emit('vehicle-route-update', res);
    },
    canDisplayForm() {
      return this.apiToken && this.activeVehicle?.objectId;
    },
    async fetchData() {
      const localData = this.fetchDataLocal();
      if (localData) {
        return JSON.parse(localData);
      }

      const remoteData = await this.fetchDataRemote();
      this.storeDataLocally(remoteData);
      return remoteData;
    },
    storeDataLocally(data) {
      if (this.isTodaySelected()) return;
      sessionStorage.setItem(this.buildStorageKey(), JSON.stringify(data));
    },
    buildStorageKey() {
      return `${this.date}-${this.activeVehicle.objectId}`;
    },
    isTodaySelected() {
      const today = new Date();
      const dd    = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      return this.date === `${yyyy}-${mm}-${dd}`;
    },
    fetchDataLocal() {
      return sessionStorage.getItem(this.buildStorageKey());
    },
    async fetchDataRemote() {
      const res = await axios.get('vehicle-route-data', {
        params: {
          date: this.date,
          objectId: this.activeVehicle.objectId,
        },
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': this.apiToken,
        },
      });

      switch (res.status) {
        case 200:
          return res.data;
        case 401:
          this.error     = 'Invalid API token';
          this.isInvalid = true;
          break;
        case 408:
          this.error     = 'Request Timeout';
          this.isInvalid = true;
          break;
        default:
          this.error     = 'Unknown error';
          this.isInvalid = true;
      }
      return {};
    },
  },
}
</script>

<style scoped>

</style>