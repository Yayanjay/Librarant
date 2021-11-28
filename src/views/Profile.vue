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
			<v-row>
				<div class="header">
					<h2>header</h2>
				</div>
			</v-row>
			<v-row>
				<v-col>
					<v-card elevation="3" class="my-2 rounded-sm">
						<v-card-title>Personal Information</v-card-title>
						<v-card-text>	
							<v-row>
								<v-col>
									<div class="black--text text-subtitle-1">
										Username
									</div>
									<div class="black--text text-subtitle-1">
										Email
									</div>
									<div class="black--text text-subtitle-1">
										Role
									</div>
								</v-col>
								<v-col>
									<div class="text-subtitle-1">
										adminmagang
									</div>
									<div class="text-subtitle-1">
										adminmagang@gmail.com
									</div>
									<div class="red--text">
										admin
									</div>
								</v-col>
							</v-row>
						</v-card-text>
						
					</v-card>
				</v-col>
				<v-col>
					<v-card elevation="3" class="my-2 rounded-sm ">
						<v-card-title>Recent History</v-card-title>
						<v-row>
							<v-col>
								<v-card
									max-width="360"
									outlined
									color="yellow lighten-3"
									class="mx-3 my-2 rounded-lg"
								>
									<v-list-item two-line class="ma-3">
										<v-img max-width="70px" src="https://user-images.githubusercontent.com/34501764/142295023-2bb2b7af-5533-427d-a41a-3c2eeb363bc4.jpg"></v-img>
										<v-list-item-content class="ml-3">
											<div class="text-h4 mb-2">
												Bumi
											</div>
												
											<v-list-item-subtitle>Fantasy, Novel</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-card>
							</v-col>
							<v-col>
								
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col>

					<v-card elevation="3" class="my-2 rounded-lg">

						<v-data-table
							:headers="headers"
							:items="history"
							:items-per-page="5"
							class="elevation-1"
						></v-data-table>
						
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import Axios from 'axios'
import TopNav from '../components/TopNav.vue'
import TopNavAdmin from '../components/TopNavAdmin.vue'
import TopNavUser from '../components/TopNavUser.vue'
export default {
	name: "Profile",
	data: () => ({
	creds : JSON.parse(localStorage.getItem("creds")),
		headers: [
			{ text: 'No',
				align: 'start',
				value: 'historyId',
			},
			{ text: 'Librarian', value: 'librarian' },
			{ text: 'Date', value: 'date' },
			{ text: 'Book', value: 'bookId.bookName' },
			{ text: 'Borrower', value: 'userId.userName' },
			{ text: 'Status', value: 'status' },
		],
		history: [],
	}),

	components: {
		TopNav,
		TopNavAdmin,
		TopNavUser
	},

	methods: {
	fetchHistory() {
		const creds = JSON.parse(localStorage.getItem("creds"))
		Axios({
		method: "post",
		url: `https://api-librarent.herokuapp.com/api/history/${creds.username}`,
		headers: {'Authorization': `Bearer ${creds.token}`},
		})
		.then((res) => {
		this.history = res.data.result
		console.log(this.history);
		})
		.catch((err) => {
		console.log(err);
		});
	}
	},

	mounted() {
	this.fetchHistory()
	}
}
</script>

<style>
.header {
	background-color: #eaeaea;
	margin-left: 1em;
	width: 90;
}
</style>