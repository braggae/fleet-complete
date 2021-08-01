<template>
  <table class="table table-bordered" id="details-table">
    <tbody>
    <tr>
      <th>Total distance</th>
      <td>{{ formatDistance(totalDistance) }}</td>
    </tr>
    <tr>
      <th>Number of stops</th>
      <td>{{ listOfStops.length }}</td>
    </tr>
    <tr>
      <th>Shortest estimated distance</th>
      <td>
        <estimated-distance
            :list-of-stops="listOfStops"
            :route-origin="routeOrigin"
        ></estimated-distance>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import estimatedDistance from './estimated-distance';

export default {
  name: "details-table",
  components: {
    estimatedDistance,
  },
  props: {
    totalDistance: { type: Number, default: 0 },
    listOfStops: Array,
    routeOrigin: Object,
  },
  methods: {
    formatDistance(distance) {
      return `${Math.ceil(distance)} km`
    },
  },
}
</script>

<style scoped>

</style>