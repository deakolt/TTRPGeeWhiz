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
	console.log('starting seed')

	console.log('seeding RPG table')
	seedRpg()
	console.log('seeded')

	console.log('seeding Count table')
	// seedCount()
	console.log('seeded')

	console.log('finished seed')

}

export default function seedRpg() {
	rpgs.forEach(async rpg => {
		await prisma.rpg.create({
			data: {
				name: rpg.name,
				subreddit: rpg.subreddit
			}
		})
	})
}

export default async function seedCount() {
	const rpgs: Rpg[] = await prisma.rpgs()

	rpgs.forEach(async rpg => {
		for (let i = 0; i < countsPerRpg; i++) {
			await prisma.rpg.create({
				data: {
					count: Math.floor(Math.random() * (minSubscribers + maxSubscribers) / 2),
					rpg: rpg
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
