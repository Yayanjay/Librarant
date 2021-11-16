<template>
	<div>
	<Topnav />
	<v-container fluid>

		<v-card class="my-2 rounded-lg">
		<v-card-title class="text-h6">Profile</v-card-title>
		<v-divider></v-divider>
			<v-row>
				<v-col cols="2">
					<v-card-text>
						Username
					</v-card-text>
					<v-card-text>
						Email
					</v-card-text>
					<v-card-text>
						Role
					</v-card-text>
					<v-card-text>
						Book Borrowed
					</v-card-text>
					<v-card-text>
						Book Returned
					</v-card-text>
				</v-col>
				<v-col cols="3">
					<v-card-text>
						: Admin Magang
					</v-card-text>
					<v-card-text>
						: adminmagang@gmail.com
					</v-card-text>
					<v-card-text>
						: user
					</v-card-text>
					<v-card-text>
						: 1
					</v-card-text>
					<v-card-text>
						: 0
					</v-card-text>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
		</v-card>
		<v-data-table
			:headers="headers"
			:items="history"
			:items-per-page="5"
			class="table elevation-3 text-button mt-5"
		></v-data-table>
		</v-container>
	</div>
</template>

<script>
import Axios from 'axios'
import Topnav from '../components/TopNav'
export default {
	name: "Profile",
	data: () => ({
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
	Topnav
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

</style>