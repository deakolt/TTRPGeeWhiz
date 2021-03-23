import axios from 'axios'
import dotenv from 'dotenv'

import prisma from '../prisma/client'

class Reddit {
	accessToken: string = ''
	clientId: string
	clientSecret: string
	password: string
	username: string

	constructor() {
		const env = dotenv.config()

		this.clientId = process.env['REDDIT_CLIENT_ID'] || ''
		this.clientSecret = process.env['REDDIT_CLIENT_SECRET'] || ''
		this.username = process.env['REDDIT_USERNAME'] || ''
		this.password = process.env['REDDIT_PASSWORD'] || ''

		console.log(process.env['REDDIT_CLIENT_SECRET'])
		if (!this.clientId || !this.clientSecret || !this.password || !this.username) {
			throw Error('missing shit')
		}

		this.getAccessToken()
	}

	async getAccessToken() {
		axios.interceptors.request.use(request => {
		  console.log('Starting Request', JSON.stringify(request, null, 2))
		  return request
		})

		// axios.interceptors.response.use(response => {
		//   // console.log('Response:', JSON.stringify(response, null, 2))
		//   return response
		// })


		const response = await axios.post(
			'https://www.reddit.com/api/v1/access_token',
			{
				headers: {
					'User-Agent': 'web:ttrpgeewhiz:v0.0.0 (by /u/MushOnline)'
				},
				auth: {
					username: this.clientId,
					password: this.clientSecret
				},
				data: {
					grant_type: 'password',
					username: this.username,
					password: this.password,
				},
			}
		)


		console.log(response)
		if (!response) {
			throw Error('missing shit')
		}

		this.accessToken = response.data['access_token']
	}

	// async fetchSubredditCount(subreddit: string) {
	// 	return await
	// }
}

console.log('can you hear me beeyotch')

const asdf = new Reddit()
