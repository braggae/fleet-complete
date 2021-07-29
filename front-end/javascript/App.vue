<template>
  <div id="app" class="container my-4">
    <api-token-form v-on:vehicle-list-update="onVehicleListUpdate"></api-token-form>
    <hr>
    <div class="row">
      <div class="col">
        <vehicle-table v-bind:data="vehicleLatestData"></vehicle-table>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>

import apiTokenForm from './components/api-token-form';
import vehicleTable from './components/vehicle-table';

export default {
  name: "app",
  components: {
    apiTokenForm,
    vehicleTable,
  },
  data() {
    return {
      vehicleLatestData: [],
    }
  },
  methods: {
    onVehicleListUpdate(data) {
      this.vehicleLatestData = data;
    }
  }
}
</script>

<style scoped>

</style>