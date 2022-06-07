<template>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="(item,i) in reservations"
        :key="i"
      >
        <v-expansion-panel-header>{{new Date(item.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }} At {{new Date(item.date).getHours()}}:{{new Date(item.date).getMinutes()}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          you book a meeting with {{item.clinic.name}} clinic
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
        this.reservations = response.data.resavations
      }).catch((error) => {
        console.log(error.response)
      })
    }
  }
};
</script>