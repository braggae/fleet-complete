<template>
  <span v-if="isDataLoaded">
    {{ this.formatDistance(this.estimatedDistance || 0) }}
  </span>
  <div v-else-if="isError" class="error-icon border-danger text-danger">!</div>
  <span
      v-else
      class="spinner-border spinner-border-sm text-secondary"
      role="status">
          <span class="visually-hidden">Loading...</span>
  </span>
</template>

<script>
import axios        from 'axios';

export default {
  name: "estimated-distance",
  props: {
    routeOrigin: Object,
    listOfStops: Array,
  },
  data() {
    return {
      isDataLoaded: false,
      estimatedDistance: null,
      isError: false,
    };
  },
  watch: {
    listOfStops: function (newVal) {
      if (newVal.length) {
        this.fetchDistance();
      }
    },
  },
  mounted() {
    this.fetchDistance();
  },
  methods: {
    async fetchDistance() {
      this.isDataLoaded = false;

      try {
        const res              = await axios.post('estimated-distance', {
          listOfStops: this.listOfStops,
          routeOrigin: this.routeOrigin,
        });
        this.estimatedDistance = res.data?.totalDistance;
      } catch (err) {
        this.isError = true;
        return;
      }

      this.isDataLoaded = true;
    },
    formatDistance(distance) {
      return `${Math.ceil(distance/1000)} km`
    },
  }
}
</script>

<style scoped>
.error-icon {
  border: 2px solid;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 1.25em;
}
</style>