const { Schema, model } = require('mongoose');

// Schemes creation

const quoteSchema = new Schema({
	content: String,
	date: Date,
	author: String,
});

// This 'configuration' will be applied when creating and fetching the quotes

quoteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

// Model Creation

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
