import axios from 'axios'

import prisma from './db/client'

async function main() {
	const allRpgs = await prisma.rpg.findMany()

	allRpgs.forEach(rpg => {
		const subreddit: string = rpg.subreddit

		const count: number = fetchSubredditCount(subreddit)

		saveSubredditCount(rpg, count)
	})
}

function fetchSubredditCount(subreddit: string): number {
	axios.get('URL')
		.then(response => {
			console.log('successfully fetched subreddit count')
			return response['subscriberNumber']
		})
		.catch(error => {
			// TODO: server log error
			console.log(error)
			throw(error)
		})
}

async function saveSubredditCount(rpg: any, count: number) {
	const savedCount = await prisma.count.create({
		data: {
			rpg: rpg,
			count: count
		}
	})

	console.log(`Counted ${count} subscribers for ${rpg.name}`)
}
