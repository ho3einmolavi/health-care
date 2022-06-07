<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" src="/img/clinic.jpg"></v-img>

    <v-card-title>{{ clinic.name }} Clinic</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="randomRating()"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{ clinic.categories.join(", ") }}
      </div>

      <div>
        You need good healthcare. Most of all, you need a trusted resource who
        can give you a clear picture of your overall health.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
          v-for="(hour, index) in clinic.openHours"
          :key="index"
          :value="hour"
          >{{ hour }}</v-chip
        >
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
        :loading="loading"
      >
        Reserve
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="error" timeout="3000">
      {{ error_message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "Clinic",
  props: {
    clinic: Object,
  },
  data() {
    return {
      loading: false,
      selection: [],
      error: false,
      error_message: "",
    };
  },
  methods: {
    reserve() {
      if (this.selection.length === 0) {
        this.error = true;
        this.error_message = "Please select an hour";
        return;
      }
      this.loading = true;
      const now = new Date().toLocaleDateString("en-CA");
      const date = `${now} ${this.selection}`;
      this.$axios
        .post("http://localhost:5000/api/resevation", {
          clinicId: this.clinic._id,
          userId: localStorage.getItem("id"),
          date: new Date(date),
        })
        .then((response) => {
          this.$router.push('/reservations');
        })
        .catch((error) => {
          this.error = true;
          this.error_message = error.response.data.message;
          this.loading = false;
        });
    },

    randomRating(min = 1, max = 5) {
      return parseInt((Math.random() * (max - min) + min).toFixed(1));
    },
  },
};
</script>
