<template>
  <div id="app" class="container my-4">
    <api-token-form v-on:vehicle-list-update="onVehicleListUpdate"></api-token-form>
    <hr>
    <div class="row">
      <div class="col gap-3">
        <vehicle-table
            v-bind:data="vehicleLatestData"
            v-on:vehicle-selected="onVehicleSelected"
        ></vehicle-table>
        <date-selection-form
            v-bind:api-token="apiToken"
            v-bind:active-vehicle="activeVehicle"
        ></date-selection-form>
      </div>
      <div class="col">
        <map-container
            v-bind:vehicle-list="vehicleLatestData"
            v-bind:active-vehicle="activeVehicle"
        ></map-container>
      </div>
    </div>
  </div>
</template>

<script>

import apiTokenForm from './components/api-token-form';
import dateSelectionForm from './components/date-selection-form';
import vehicleTable from './components/vehicle-table';
import mapContainer from './components/map-container';

export default {
  name: "app",
  components: {
    apiTokenForm,
    dateSelectionForm,
    vehicleTable,
    mapContainer,
  },
  data() {
    return {
      vehicleLatestData: [],
      activeVehicle: {},
      apiToken: null,
    }
  },
  methods: {
    onVehicleListUpdate(data, apiToken) {
      this.vehicleLatestData = data;
      this.apiToken = apiToken;
    },
    onVehicleSelected(vehicle) {
      this.activeVehicle = vehicle;
    },
  }
}
</script>

<style scoped>

</style>