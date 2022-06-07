<template>
  <v-app>
    <v-navigation-drawer
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

      <v-btn depressed color="error" @click="logout" type="button">
        Log out
      </v-btn>
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
        if (this.$route.path !== "/login" && this.$route.path !== "/signup") {
          this.$router.push("/login");
        }
      } else if (
        this.$route.path === "/login" ||
        this.$route.path === "/signup"
      ) {
        this.$router.push("/");
      }
    },
    logout() {
      localStorage.removeItem("id");
      this.$router.push("/login");
    },
  },
};
</script>
