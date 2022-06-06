<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sign Up</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form ref="form" @submit.prevent="signup()">
            <v-text-field
              v-model="name"
              name="name"
              label="Full Name"
              type="text"
              placeholder="Full Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              name="email"
              label="email"
              type="text"
              placeholder="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="phone"
              type="number"
              placeholder="Phone Number"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              placeholder="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="age"
              name="age"
              label="Age"
              type="number"
              placeholder="Age"
              required
            ></v-text-field>
            <v-text-field
              v-model="height"
              name="age"
              label="Height (in cm)"
              type="number"
              placeholder="Height (in cm)"
              required
            ></v-text-field>
            <v-text-field
              v-model="weight"
              name="weight"
              label="Weight (in kg)"
              type="number"
              placeholder="Weight (in kg)"
              required
            ></v-text-field>
            <v-select
              :items="['single', 'married']"
              v-model="maritalState"
              filled
              label="Marital State"
            ></v-select>
            <v-title> Do you have any serious disease? </v-title>
            <v-radio-group v-model="serious_disease" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
            </v-radio-group>
            <v-title> Do you have any experience of any surgery? </v-title>
            <v-radio-group v-model="surgery" row>
              <v-radio label="Yes" value="yes"></v-radio>
              <v-radio label="No" value="no"></v-radio>
            </v-radio-group>
            <v-title> BMI </v-title>
            <v-text-field
              v-model="bmi"
              type="text"
              disabled
              placeholder="Calculating BMI"
              required
            ></v-text-field>
            <v-btn type="submit" class="mt-4" color="primary" :loading="loading"
              >Signup</v-btn
            >
          </form>
          <v-snackbar v-model="error" timeout="3000">
            {{ error_message }}
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="error = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "signup",

  computed: {
    bmi() {
      if (this.weight && this.height) {
        return (this.weight / (this.height / 100) ** 2).toFixed(2);
      }
    },
  },
  data() {
    return {
      error: false,
      error_message: "",
      loading: false,
      email: "",
      password: "",
      name: "",
      age: "",
      height: null,
      weight: null,
      maritalState: "",
      serious_disease: "",
      surgery: "",
      phone: null,
    };
  },
  methods: {
    signup() {
      this.error = false;
      this.loading = true;
      this.$axios
        .post("http://localhost:5000/api/user/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          age: this.age,
          height: this.height,
          weight: this.weight,
          maritalState: this.maritalState,
          serious_disease: this.serious_disease,
          surgery: this.surgery,
          phone: this.phone,
          bmi: this.bmi,
        })
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          localStorage.setItem("id", response.data.user._id);
          this.$router.push("/verify");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.error = true;
          this.error_message = error.response.data.message;
        });
    },
  },
};
</script>