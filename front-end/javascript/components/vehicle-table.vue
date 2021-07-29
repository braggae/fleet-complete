<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
<!--        <th>Speed</th> TODO: ask about speed calculation-->
        <th>Last Update</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicle in data"
          class="vehicle-row"
          v-bind:class="{ 'table-active': selectedId === vehicle.name }"
          v-on:click="onClickEvent(vehicle)"
      >
        <td>{{vehicle.name}}</td>
        <td>{{getRelativeTime(new Date(vehicle.timestamp))}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "vehicle-table",
  props: {
    data: Array,
  },
  data() {
    return {
      selectedId: null,
    }
  },
  methods: {
    getRelativeTime(d1, d2 = new Date()) {
      const units = {
        year  : 24 * 60 * 60 * 1000 * 365,
        month : 24 * 60 * 60 * 1000 * 365/12,
        day   : 24 * 60 * 60 * 1000,
        hour  : 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
      }
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      const elapsed = d1 - d2

      // "Math.abs" accounts for both "past" & "future" scenarios
      for (let u in units)
        if (Math.abs(elapsed) > units[u] || u === 'second')
          return rtf.format(Math.round(elapsed/units[u]), u)
    },
    onClickEvent(vehicle) {
      this.selectedId = vehicle.name;

      this.$emit('vehicle-selected', vehicle);
    },
  }
}
</script>

<style scoped>
  .vehicle-row {
    cursor: pointer;
  }
</style>