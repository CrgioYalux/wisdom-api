require('dotenv').config();

const mongoose = require('mongoose');

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.error(err);
	});

// process.on('uncaughtException', () => {
// 	moongose.connection.disconnect();
// });
