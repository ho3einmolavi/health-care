<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Verify Your Email</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form ref="form" @submit.prevent="verify()">
            <v-text-field
              v-model="verificationCode"
              label="Verification Code"
              type="text"
              placeholder="Verification Code"
              required
            ></v-text-field>

            <v-btn type="submit" class="mt-4" color="primary" :loading="loading"
              >Verify Your Email</v-btn
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
  name: "verifyEmail",

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
      verificationCode: null,
    };
  },
  methods: {
    verify() {
      this.error = false;
      this.loading = true;
      this.$axios
        .post("http://localhost:5000/api/user/verify", {
          userId: localStorage.getItem("id"),
          verificationCode: this.verificationCode,
        })
        .then((response) => {
          this.loading = false;
          this.$router.push("/");
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