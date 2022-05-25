<template>
  <v-row>
    <Clinic v-for="(item, index) in 10" :key="index" />
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
