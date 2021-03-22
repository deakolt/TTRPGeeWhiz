import prisma from '../client'
import seedCount from './count'
import seedRpg from './rpg'

console.log('starting clean and seed')

console.log('wiping Rpg and Count tables')
wipe()
console.log('wiped')

console.log('seeding RPG table')
seedRpg()
console.log('seeded')

console.log('seeding Count table')
seedCount()
console.log('seeded')

console.log('finish clean and seed')

async function wipe() {
	// TODO : Prisma cascading deletes?
	await prisma.count.deleteMany({})
	await prisma.rpg.deleteMany({})
}
