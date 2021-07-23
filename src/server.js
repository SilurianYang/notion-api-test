const express = require('express');
const {getDatabase, newEntryToDatabase} = require('./index');

const port = 8000;
const app = express();
app.use(express.static('public'));
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/users', async (req, res) => {
	const users = await getDatabase();
	res.json(users);
});

app.post('/submit-form', async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    const result= await newEntryToDatabase(name, role);
    res.redirect("/");
    res.end();
});

app.listen(port, console.log(`Server started on ${port}`));
