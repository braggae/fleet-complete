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
            v-on:vehicle-route-update="onVehicleRouteUpdate"
        ></date-selection-form>
        <details-table v-if="totalDistance" :total-distance="totalDistance"></details-table>
      </div>
      <div class="col">
        <map-container
            v-bind:vehicle-list="vehicleLatestData"
            v-bind:active-vehicle="activeVehicle"
            v-bind:vehicle-path="vehiclePath"
        ></map-container>
      </div>
    </div>
  </div>
</template>

<script>

import apiTokenForm      from './components/api-token-form';
import dateSelectionForm from './components/date-selection-form';
import vehicleTable      from './components/vehicle-table';
import detailsTable      from './components/details-table';
import mapContainer      from './components/map-container';

export default {
  name: "app",
  components: {
    apiTokenForm,
    dateSelectionForm,
    vehicleTable,
    mapContainer,
    detailsTable,
  },
  data() {
    return {
      vehicleLatestData: [],
      activeVehicle: {},
      apiToken: null,
      vehiclePath: [],
      totalDistance: 0,
    }
  },
  methods: {
    onVehicleListUpdate(data, apiToken) {
      this.vehicleLatestData = data;
      this.apiToken          = apiToken;
    },
    onVehicleSelected(vehicle) {
      this.activeVehicle = vehicle;
      this.vehiclePath = [];
      this.totalDistance = 0;
    },
    onVehicleRouteUpdate(data) {
      this.totalDistance = data[data.length - 1]?.distance - data[0]?.distance;
      data.forEach(item => {
        this.vehiclePath.push({ lat: item.latitude, lng: item.longitude });
      });
    },
  },
}
</script>

<style scoped>

</style>