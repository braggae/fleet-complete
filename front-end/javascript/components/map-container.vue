<template>
  <gmaps-map id="map" v-bind:options="mapOptions">
    <gmaps-marker
        v-for="vehicle in vehicleList"
        :key="vehicle.objectId"
        :position="{ lat: vehicle.latitude, lng: vehicle.longitude }"
    />
    <gmaps-marker
        v-for="(stop, i) in listOfStops"
        :key="i"
        :position="stop"
        :icon="'http://maps.google.com/mapfiles/ms/micons/red-pushpin.png'"
    />
    <gmaps-polyline :path="vehiclePath" :strokeColor="'aqua'"/>
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
    }
  },
  watch: {
    activeVehicle: function (newVal) {
      if (!newVal) return;
      this.updateMapPosition(this.getMapCenter(newVal));
      this.setMapZoom(SELECTED_VEHICLE_ZOOM);
    },
    vehiclePath: function (newVal) {
      if (newVal.length === 0) return;
      this.updateMapPosition(newVal[0]);
    }
  },
  methods: {
    getMapCenter(vehicle = {}) {
      return {
        lat: vehicle?.latitude ?? DEFAULT_CENTER.lat,
        lng: vehicle?.longitude ?? DEFAULT_CENTER.lng,
      }
    },
    /**
     *
     * @param {Object} pos
     * @param {Number} pos.lat
     * @param {Number} pos.lng
     */
    updateMapPosition(pos) {
      this.mapOptions.center = pos;
    },
    setMapZoom(zoom) {
      this.mapOptions.zoom = zoom;
    }
  },
}
</script>

<style scoped>
#map {
  min-height: 400px;
}
</style>