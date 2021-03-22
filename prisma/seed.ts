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
	seedRpg()

	seedCount()
}

function seedRpg() {
	rpgs.forEach(async rpg => {
		const wtf = await prisma.rpg.create({
			data: {
				name: rpg.name,
				subreddit: rpg.subreddit
			}
		})

		console.log(wtf)
	})
}

async function seedCount() {
	const rpgs = await prisma.rpg.findMany({ select: { id: true }})

	rpgs.forEach(async rpg => {
		for (let i = 0; i < countsPerRpg; i++) {
			await prisma.count.create({
				data: {
					count: Math.floor(Math.random() * (minSubscribers + maxSubscribers) / 2),
					rpgId: rpg.id
				}
			})
		}
	})
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
