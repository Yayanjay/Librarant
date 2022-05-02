<template>
	<div>
		<v-row class="auth">
			<v-col class="pink lighten-3" cols="6">

				<div class="card d-flex justify-center">
					<AuthLeft />
				</div>
			</v-col>
			<v-col class="blue lighten-3" cols="6">
				<div class="card d-flex justify-center">
					<v-card width="500px" class="rounded-lg pa-4">
						<v-card-title class="justify-center align-center">Sign In</v-card-title>
							<v-form	ref="form" v-model="valid" lazy-validation class="ma-3">

								<v-text-field 
									v-model="email" 
									:rules="emailRules" 
									label="E-mail" 
									required
								>

								</v-text-field>

								<v-text-field	
									v-model="password" 
									:rules="passRules" 
									:append-icon="value ? 'mdi-eye' : 'mdi-eye-off'" 
									@click:append="() => (value = !value)" 
									:type="value ? 'password' : 'text'" 
									label="Password" 
									required
								>

								</v-text-field>

								<div class="d-flex flex-column">
									<h5>Sign in later?
										
									<v-btn color="light-blue darken-4" dark small plain router to="/">Browse book</v-btn>
									</h5> 
									<h5>Don't have an account?
										
									<v-btn color="light-blue darken-4" dark small plain router to="/signup">Sign Up</v-btn>
									</h5>

								</div>

								<v-btn dark color="cyan darken-1" class="mt-4"	@click="signIn">
									Sign In
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
import AuthLeft from '../components/AuthLeft.vue'

export default {
	data: () => ({
		valid: true,
		value: true,
		password: '',
		passRules: [
			v => !!v || 'Password is required',
			// v => /^(?=.*[a-z])(?=.*[0-9])/.test(v) || 'password must contain letter and number',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
	}),
	components: {AuthLeft},
	methods: {
		signIn() {
			const data = {
				userEmail : this.email,
				userPassword : this.password
			}

			Axios({
				method: "post",
					// url: 'http://localhost:3200/api/users/signin',
				url: "https://api-librarent.herokuapp.com/api/users/signin",
				data,
			})

			.then((res) => {
				if (res.data.message == "Bad Credentials" || res.data.message == "bad credentials" ) {
					return alert("email/password invalid")
				}
				alert(res.data.message)
				let data = {
					"username" : res.data.result.username, 
					"email" : res.data.result.email, 
					"role" : res.data.result.role, 
					"token" : res.data.result.token,
					"authenticated" : true,
					"id" : res.data.result.id
				}
				localStorage.setItem('creds', JSON.stringify(data))
				this.$router.push({ path: "/home"})
			
			})
			.catch((err) => {
				console.log(err)
			})
		},
	}
}
</script>

<style>
.auth{
	/* margin: 0.5px; */
	height: 101vh;
}
.card {
	margin: 200px;
}
</style>