import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient({
	log: ['query', 'info', `warn`, `error`],
})
// let prisma = new PrismaClient({
// 	log: [
// 		{
// 		  emit: 'event',
// 		  level: 'query',
// 		},
// 	],
// })

// prisma.$on('query', e => {
//   console.log("Query: " + e.query)
//   console.log("Duration: " + e.duration + "ms")
// })

export default prisma
