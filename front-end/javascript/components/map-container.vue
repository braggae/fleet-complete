<template>
  <gmaps-map id="map" v-bind:options="mapOptions">
    <gmaps-marker
        v-for="vehicle in vehicles"
        :key="vehicle.objectId"
        :position="{ lat: vehicle.latitude, lng: vehicle.longitude }"
    />
    <gmaps-marker
        v-for="(stop, i) in listOfStops"
        :key="i"
        :position="stop"
    />
    <gmaps-polyline :path="vehiclePath" />
  </gmaps-map>
</template>

<script>
import { gmapsMap, gmapsMarker, gmapsPolyline } from 'x5-gmaps';

const DEFAULT_CENTER = { lat: 58.406288, lng: 26.741240 };
const INITIAL_ZOOM = 10;
const SELECTED_VEHICLE_ZOOM = 18;

export default {
  name: "map-container",
  components: {
    gmapsMap,
    gmapsMarker,
    gmapsPolyline,
  },
  props: {
    vehicleList: { type: Array, default: [], },
    listOfStops: { type: Array, default: [], },
    activeVehicle: Object,
    vehiclePath: { type: Array, default: [], }
  },
  data() {
    return {
      mapOptions: {
        center: this.getMapCenter(this.activeVehicle),
        zoom: INITIAL_ZOOM,
        disableDefaultUI: true,
      },
      vehicles: this.vehicleList,
    }
  },
  watch: {
    activeVehicle: function (newVal, oldVal) {
      this.mapOptions.center = this.getMapCenter(newVal);
      this.mapOptions.zoom = SELECTED_VEHICLE_ZOOM;
    },
    listOfStops: function (newVal) {
      if (!newVal.length) return;

      this.vehicles = [];
      this.mapOptions.zoom = INITIAL_ZOOM;
    }
  },
  methods: {
    getMapCenter(vehicle = {}) {
      return {
        lat: vehicle?.latitude ?? DEFAULT_CENTER.lat,
        lng: vehicle?.longitude ?? DEFAULT_CENTER.lng,
      }
    },
  },
}
</script>

<style scoped>
#map {
  min-height: 400px;
}
</style>