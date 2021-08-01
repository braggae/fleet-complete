<template>
  <div id="app" class="container my-4">
    <api-token-form v-on:vehicle-list-update="onVehicleListUpdate"></api-token-form>
    <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 gap-3">
        <vehicle-table
            :data="vehicleLatestData"
            v-on:vehicle-selected="onVehicleSelected"
        ></vehicle-table>
        <date-selection-form
            :api-token="apiToken"
            :active-vehicle="activeVehicle"
            v-on:vehicle-route-update="onVehicleRouteUpdate"
        ></date-selection-form>
        <details-table
            v-if="vehiclePath.length"
            :total-distance="totalDistance"
            :list-of-stops="listOfStops"
            :route-origin="routeOrigin"
        ></details-table>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <map-container
            :vehicle-list="vehicleLatestData"
            :active-vehicle="activeVehicle"
            :vehicle-path="vehiclePath"
            :list-of-stops="listOfStops"
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
      listOfStops: [],
      routeOrigin: {},
    }
  },
  methods: {
    onVehicleListUpdate(data, apiToken) {
      this.vehicleLatestData = data;
      this.apiToken          = apiToken;
    },
    onVehicleSelected(vehicle) {
      this.resetMapData();
      this.activeVehicle = vehicle;
    },
    onVehicleRouteUpdate(data) {
      this.resetMapData();
      this.routeOrigin = {lat: data[0].latitude, lng: data[0].longitude }
      this.totalDistance = data[data.length - 1]?.distance - data[0]?.distance;
      data.forEach(item => {
        this.vehiclePath.push({ lat: item.latitude, lng: item.longitude });
        if (item.isStop) {
          this.listOfStops.push({ lat: item.latitude, lng: item.longitude });
        }
      });
    },
    resetMapData() {
      this.vehiclePath = [];
      this.totalDistance = 0;
      this.listOfStops = [];
      this.routeOrigin = {};
    }
  },
}
</script>

<style scoped>

</style>