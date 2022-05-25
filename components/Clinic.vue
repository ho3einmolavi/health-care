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

    <v-card-title>Milan Clinic</v-card-title>

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

      <div class="my-4 text-subtitle-1">{{ randomClinicCategories().join(", ") }}</div>

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
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Clinic",
  data() {
    return {
      loading: false,
      selection: [],
      categories: [
        "Dentist",
        "Psychologist",
        "Surgeon",
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "Ophthalmologist",
        "Oncologist",
        "Endocrinologist",
        "Gastroenterologist",
        "Urologist",
        "Brain Surgeon",
        "Otolaryngologist",
        "Pulmonologist",
        "Rheumatologist",
        "Osteopath",
        "Orthopedist",
      ],
    };
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },

    randomRating(min = 1, max = 5) {
      // return Math.floor(Math.random() * to) + from;
      return (Math.random() * (max - min) + min).toFixed(1);
    },

    randomClinicCategories() {
      return this.categories.sort(() => 0.5 - Math.random()).slice(0, 2);
    },
  },
};
</script>
