import prisma from './client'

const rpgs = [
	{ name: 'Call of Cthulhu', subreddit: 'callofcthulhu' },
	{ name: 'Dungeons & Dragons', subreddit: 'DnD' },
	{ name: 'Mouse Guard', subreddit: 'MouseGuard' },
	{ name: 'Warhammer Fantasy Roleplaying', subreddit: 'warhammerfantasyrpg' },
]

const countsPerRpg: number = 10
const minSubscribers: number = 1000
const maxSubscribers: number = 1000000

async function main() {
	await seedRpg()

	await seedCount()
}

async function seedRpg() {
	await Promise.all(rpgs.map(rpg => {
		return prisma.rpg.create({
			data: {
				name: rpg.name,
				subreddit: rpg.subreddit
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
