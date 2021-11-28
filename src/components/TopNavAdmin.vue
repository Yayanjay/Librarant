<template>
  <div>
    <v-app-bar>

			<v-btn plain @click.stop="drawer = !drawer">
        <v-icon>fas fa-bars</v-icon>
      </v-btn>
	
      <v-btn plain depressed class="" to="/">
        LibraRent
      </v-btn>
      
      <v-spacer></v-spacer>

      <v-btn color="yellow lighten-4" class="mx-3" @click="logout">
        Logout
      </v-btn>

		</v-app-bar>


    <v-navigation-drawer v-model="drawer" :width="400" absolute temporary app >

      <!-- header navigation drawer -->
      <v-card class="text-center" elevation="0">
        <v-img width="10rem" class="ava mx-auto mt-10" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        <v-card-title class="justify-center">{{ creds.username }}</v-card-title>
        <v-card-subtitle>{{ creds.email }}</v-card-subtitle>
      </v-card>

			<!-- menu list navigation drawer -->
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.routes"
					link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

		</v-navigation-drawer>

  </div>
</template>

<script>
export default {
	name: "TopNav",
  data: () => ({
    creds : JSON.parse(localStorage.getItem("creds")),
    drawer: null,
    items: [
      { title: 'Explore', icon: 'fa fa-compass', routes: '/' },
      { title: 'History', icon: 'fa fa-history', routes: '/history' },
      { title: 'Profile', icon: 'fa fa-user', routes: '/profile' },
      { title: 'Books', icon: 'fa fa-book', routes: '/books' },
    ],
  }),
  methods: {
    logout() {
      let check = confirm("are you sure want to logout?")

      if (check) {
        localStorage.removeItem("creds")
        this.$router.push({ path: "/signin"})
      }
    }
  }
}
</script>

<style>
.ava {
	border-radius: 100%;
}

</style>