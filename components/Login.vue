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
          </form>
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
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const { email } = this;
      console.log(email + "logged in");
    },
  },
};
</script>