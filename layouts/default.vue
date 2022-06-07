<template>
  <v-app>
    <v-navigation-drawer
      v-if="loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn
        v-if="loggedIn"
        depressed
        color="error"
        @click="logout"
        type="button"
      >
        Log out
      </v-btn>
      <!-- <nuxt-link to="/signup">
        <v-btn v-if="!loggedIn" depressed color="primary"> Sign up </v-btn>
      </nuxt-link>
      <nuxt-link to="/login">
        <v-btn v-if="!loggedIn" depressed color="secondary"> Login </v-btn>
      </nuxt-link> -->
      <v-btn-toggle rounded v-else>
        <v-btn depressed color="primary" to="/signup"> Sign up </v-btn>
        <v-btn depressed color="success" to="/login"> Login </v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      loggedIn: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "my reservations",
          to: "/reservations",
        },
      ],
      miniVariant: false,
      title: "clinical time reservation",
    };
  },

  created() {
    this.checkUser();
  },

  methods: {
    checkUser() {
      if (!localStorage.getItem("id")) {
        this.loggedIn = false;
        if (this.$route.path !== "/login" && this.$route.path !== "/signup") {
          this.$router.push("/login");
        }
      } else {
        this.loggedIn = true;
        if (this.$route.path === "/login" || this.$route.path === "/signup") {
          this.$router.push("/");
        }
      }
    },
    logout() {
      localStorage.removeItem("id");
      location = "/login";
    },
  },
};
</script>
