require('./mongoose/connection');

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const api_routes = require('./routes/api');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('<h1>Working</h1>');
});

app.use('/api/quotes', api_routes);

app.use((req, res, next) => {
	res.status(404).end();
});

app.use((err, req, res, next) => {
	if (err.name === 'CastError') {
		res.status(400).send({ error: 'Used ID is malformed' });
	} else {
		res.status(500);
	}
});

app.listen(port, () => {
	console.log('Server running at ', port);
});
