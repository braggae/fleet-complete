<template>
  <table class="table table-bordered" id="details-table">
    <tbody>
    <tr>
      <th>Total distance</th>
      <td>{{formatDistance(totalDistance)}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "details-table",
  props: {
    totalDistance: 0,
  },
  methods: {
    formatDistance(distance) {
      return `${Math.ceil(distance)} km`
    }
  },
}
</script>

<style scoped>

</style>