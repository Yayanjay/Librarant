<template>
  <div>
    <div v-if="creds.role == 'User'">
      <TopNavUser/>
    </div >
    <div v-else-if="creds.role == 'admin'">
      <TopNavAdmin/>
    </div>
    <div v-else>
      <TopNav />
    </div>

    <v-container fluid>
      <v-row>
        <Card/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue"
import TopNavUser from "../components/TopNavUser.vue"
import TopNavAdmin from "../components/TopNavAdmin.vue"
import Card from '../components/Card.vue'


export default {
    name: 'Home',
    data: () => ({
      books: [],
      creds : JSON.parse(localStorage.getItem("creds"))

    }),
    components: {
      TopNav,
      Card,
      TopNavUser,
      TopNavAdmin
    }
}
</script>

<style>
</style>