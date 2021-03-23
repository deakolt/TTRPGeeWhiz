# TTRPGeeWhiz

## Introduction
Use Reddit stats as a proxy for the popularity of TTRPGs:

Subreddit Popularity: Daily Cron

Hotness: NLP on LFG and RPG

### Dev Setup
- `mysql.server start`
- `npx prisma migrate dev --name init --schema ./src/db/schema.prisma`

### Prisma
- Create migration:
	- `npx prisma migrate dev --name init`
	- `npx prisma migrate dev --name secondmigration`
- Run migration:
	- `npx prisma migrate dev`
- Run seed:
	- `npx prisma db seed --preview-feature`
- Reset DB, Create new DB, Run Migrations, Run Seed Scripts:
	- `npx prisma migrate reset`
- Debug:
	- `export DEBUG="*"`

### Reddit API

-  https://www.reddit.com/prefs/apps
-  curl -X POST -d 'grant_type=password&username=ASDF&password=JKL' --user 'ID:SECRET' --user-agent 'web:ttrpgeewhiz:v0.0.0 (by /u/MushOnline)' https://www.reddit.com/api/v1/access_token
- {"access_token": "TOKEN", "token_type": "bearer", "expires_in": 3600, "scope": "*"}%

### Architecture

- Daily Cron JOB that populates a MySQL database table


### Database Schema:

- RPGs
- ID, RPG Name, Subreddit

- Counts
- ID, RPGS_ID FK, Count, Date, Plural, Fetch_Date ?
