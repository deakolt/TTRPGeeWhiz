import prisma from '../client'

const countsPerRpg: number = 10
const minSubscribers: number = 1000
const maxSubscribers: number = 1000000

export default async function seedCount() {
	const Rpgs: Rpg[] = await prisma.rpgs()

	allRpgs.forEach(async rpg => {
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
