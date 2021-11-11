<template>
  <div>
  <v-row class="auth">
    <v-col class="pink lighten-3" cols="6">
    left
    </v-col>
    <v-col class="blue lighten-3" cols="6">
    <div class="card d-flex justify-center">
      <v-card width="500px" class="rounded-lg pa-4">
      <v-card-title class="justify-center align-center">Sign Up</v-card-title>
        <v-form	ref="form" v-model="valid" lazy-validation class="ma-3">
			<v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>

			<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

			<v-text-field	v-model="password" :rules="passRules" label="Password" required></v-text-field>

			<div class="d-flex">
				<h5>Already have an account?<v-btn color="light-blue darken-4" dark small plain router to="/signin">Sign In</v-btn></h5> 

			</div>

			<v-btn dark color="cyan darken-1" class="mt-4"	@click="signUp">
				Sign Up
			</v-btn>
        </v-form>
      </v-card>
    </div>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
		name: '',
		nameRules: [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		password: '',
		passRules: [
			v => !!v || 'Password is required',
			// v => ("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$") || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		username: '',
		usernameRules: [
			v => !!v || 'Username is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
  }),
	methods: {
		signUp() {
			const data = {
				UserName : this.username,
				UserEmail : this.email,
				userPassword : this.password,
				UserRole : "User"
			}

			console.log(data)

			Axios({
				method: "post",
				url: "http://localhost:3200/api/users/signup",
				data,
				headers: {
          "Content-type" : "application/json"
        }
			})

			.then((res) => {
				alert(res.status)
				console.log(res.data)

			})
			.catch((err) => {
				console.log(err)
			})
		},
		tes() {
			console.log(this.email, this.password)
		}
	}
}
</script>

<style>
.auth{
  height: 101vh;
}

.card {
  margin: 200px;
}
</style>