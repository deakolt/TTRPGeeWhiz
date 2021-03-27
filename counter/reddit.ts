import axios from 'axios'

import prisma from '../prisma/client'

const USER_AGENT: string = 'web:ttrpgeewhiz:v0.0.0 (by /u/MushOnline)'

async function getSubredditCount(subreddit: string) {
	const response = await axios.get(
		`https://www.reddit.com/r/${subreddit}/about/.json`,
		{
			headers: {
				'User-Agent': USER_AGENT
			}
		}
	)

	return response.data['data']['subscribers']
}

export default getSubredditCount
