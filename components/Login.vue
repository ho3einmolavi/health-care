<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form ref="form" @submit.prevent="login()">
            <v-text-field
              v-model="email"
              name="email"
              label="email"
              type="text"
              placeholder="email"
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
            <v-btn type="submit" class="mt-4" color="primary" value="log in"
              >Login</v-btn
            >
            <!-- <nuxt-link to="/signup" class="mt-4">
              Signup
            </nuxt-link> -->
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
  name: "Login",
  data() {
    return {
      loading: false,
      error: false,
      error_message: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$axios
        .post("http://localhost:5000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          localStorage.setItem("id", response.data.user._id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data);
          this.loading = false;
          this.error = true;
          this.error_message = error.response.data.message;
        });
    },
  },
};
</script>