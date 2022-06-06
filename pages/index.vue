<template>
  <v-row>
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="loading"
    ></v-progress-circular>
    <Clinic v-else v-for="(item, index) in clinics" :key="index" :clinic="item" />
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      loading: false,
      clinics: [],
    };
  },

  created() {
    this.getClinics();
  },

  methods: {
    getClinics() {
      this.loading = true;
      this.$axios
        .get("http://localhost:5000/api/clinic")
        .then((response) => {
          this.clinics = response.data.clinics;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
