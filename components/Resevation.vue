<template>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>today</v-expansion-panel-header>
        <v-expansion-panel-content>
          you book a meeting with Dr.Ja for today
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  name: "reservation",

  data() {
    return {
      reservations: [],
      loading: false,
    }
  },

  created() {
    this.getReservations()
  },

  methods: {
    getReservations() {
      this.$axios.get(`http://localhost:5000/api/resevation/${localStorage.getItem('id')}`)
      .then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error.response)
      })
    }
  }
};
</script>