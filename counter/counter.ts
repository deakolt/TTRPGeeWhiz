import axios from 'axios'

import getSubredditCount from './reddit'
import prisma from '../prisma/client'

async function main() {
	const rpgs = await prisma.rpg.findMany()

	const creationPromises: Promise<any>[] = []
	await Promise.all(rpgs.map(async rpg => {
		const count: number = await getSubredditCount(rpg.subreddit)

		creationPromises.push(saveSubredditCount(rpg.id, count))
	}))

	await Promise.all(creationPromises)
}

async function saveSubredditCount(rpgId: number, count: number) {
	const savedCount = await prisma.count.create({
		data: {
			rpgId: rpgId,
			count: count
		}
	})

	console.log(`Counted ${count} subscribers for ${rpgId}`)
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
