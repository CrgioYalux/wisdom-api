require('./mongoose/connectionHandler');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
	response.send('<h1>Working</h1>');
});

app.use((req, res, next) => {
	res.status(404).end();
});

app.use((err, req, res, next) => {
	console.error(err);
	if (err.name === 'CastError') {
		res.status(400).send({ error: 'Used ID is malformed' });
	} else {
		res.status(500).end();
	}
});

app.listen(port, () => {
	console.log('Server running at ', port);
});
