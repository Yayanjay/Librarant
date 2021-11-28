<template>
  <div>
    <div v-if="creds.authenticated == true">
      <div v-if="creds.role[0] == 'user'">
        <TopNavUser/>
      </div >
      <div v-else-if="creds.role[0] == 'admin'">
        <TopNavAdmin/>
      </div>
      <div v-else>
        <TopNav />
      </div>
    </div>
    <div v-else>
      <TopNav />
    </div>
    
    <v-container fluid>
        <Card/>
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
      creds : null,
      credsData: {
        "username" : '', 
        "email" : '', 
        "role" : '', 
        "token" : '',
        "authenticated" : false,
        "id" : ''
      }
    }),
    components: {
      TopNav,
      Card,
      TopNavUser,
      TopNavAdmin
    },
    beforeMount() {
      if (localStorage.getItem("creds")) {
        this.creds = JSON.parse(localStorage.getItem("creds")) 
      } else { 
        localStorage.setItem("creds", JSON.stringify(this.credsData))
      }
    }
}
</script>

<style>
</style>