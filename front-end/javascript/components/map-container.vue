<template>
  <gmaps-map id="map" v-bind:options="mapOptions">
    <gmaps-marker
        v-for="vehicle in vehicleList"
        :key="vehicle.objectId"
        :position="{ lat: vehicle.latitude, lng: vehicle.longitude }"/>
  </gmaps-map>
</template>

<script>
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

const DEFAULT_CENTER = { lat: 58.406288, lng: 26.741240 };
const INITIAL_ZOOM = 10;
const SELECTED_VEHICLE_ZOOM = 18;

export default {
  name: "map-container",
  props: {
    vehicleList: Array,
    activeVehicle: Object,
  },
  data() {
    return {
      mapOptions: {
        center: this.getMapCenter(this.activeVehicle),
        zoom: INITIAL_ZOOM,
        disableDefaultUI: true,
      },
    }
  },
  watch: {
    activeVehicle: function (newVal, oldVal) {
      this.mapOptions.center = this.getMapCenter(newVal);
      this.mapOptions.zoom = SELECTED_VEHICLE_ZOOM;
    },
  },
  computed: {},
  components: {
    gmapsMap,
    gmapsMarker,
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