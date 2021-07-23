require('dotenv').config();
const {Client} = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASEID = process.env.NOTION_API_DATABASE;

const notion = new Client({auth: NOTION_API_KEY});

async function getDatabase() {
	const {results} = await notion.databases.query({database_id: DATABASEID});
	const list = results.map((page) => {
		return {
			id: page.id,
			name: page.properties.Name.title[0]?.plain_text,
			value: page.properties.Role.rich_text[0]?.plain_text,
		};
	});
	return list;
}

async function newEntryToDatabase(name, role) {
	const res = await notion.pages.create({
		parent: {
			database_id: DATABASEID,
		},
		properties: {
			Name: {
				title: [
					{
						text: {
							content: name,
						},
					},
				],
			},
			Role: {
				rich_text: [
					{
						text: {
							content: role,
						},
					},
				],
			},
		},
	});
    return res;
}

module.exports = {
	getDatabase,
    newEntryToDatabase
};
