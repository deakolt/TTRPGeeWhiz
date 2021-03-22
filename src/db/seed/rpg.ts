import prisma from '../client'


const rpgs = [
	{ name: 'Call of Cthulhu', subreddit: 'callofcthulhu' },
	{ name: 'Dungeons & Dragons', subreddit: 'DnD' },
	{ name: 'Mouse Guard', subreddit: 'MouseGuard' },
	{ name: 'Warhammer Fantasy Roleplaying', subreddit: 'warhammerfantasyrpg' },
]

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
