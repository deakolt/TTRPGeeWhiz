import fs from 'fs'
import prisma from './client'

const countsPerRpg: number = 10
const minSubscribers: number = 1000
const maxSubscribers: number = 1000000

type JSONRpg = {
	name: string
	subreddit: string
}

function isJSONRpg(object: any): object is JSONRpg {
	return "name" in object && "subreddit" in object
}

async function main() {
	await seedRpg()

	await seedCount()
}

async function seedRpg() {
	const rpgs = JSON.parse(fs.readFileSync('./data/rpgs.json', 'utf8')) as JSONRpg[]

	await Promise.all(rpgs.map(rpg => {
		let jsonRpg = rpg as JSONRpg

		if (!isJSONRpg(jsonRpg)) {
			throw Error(`invalid rpg JSON: ${JSON.stringify(rpg)}`)
		}

		return prisma.rpg.create({
			data: {
				name: jsonRpg.name,
				subreddit: jsonRpg.subreddit
			}
		})
	}))
}

async function seedCount() {
	const rpgs = await prisma.rpg.findMany({ select: { id: true }})

	const creationPromises: Promise<any>[] = []
	rpgs.forEach(rpg => {
		for (let i = 0; i < countsPerRpg; i++) {
			creationPromises.push(prisma.count.create({
				data: {
					count: Math.floor(Math.random() * (minSubscribers + maxSubscribers) / 2),
					rpgId: rpg.id
				}
			}))
		}
	})

	await Promise.all(creationPromises)
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
