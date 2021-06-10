const Quote = require('../mongoose/models/Quote');
// poner un catch pata todos

function getAllQuotes(req, res, next) {
	Quote.find({})
		.then((quotes) => {
			res.send(quotes);
		})
		.catch(next);
}

function getQuote(req, res, next) {
	const { id } = req.params;
	Quote.findById(id)
		.then((quote) => (quote ? res.json(quote) : res.sendStatus(404).end()))
		.catch(next);
}

function deleteQuote(req, res, next) {
	const { id } = req.params;
	Quote.findByIdAndRemove(id)
		.then(() => {
			res.sendStatus(204).end();
		})
		.catch(next);
}

function modifyQuote(req, res, next) {
	const { id } = req.params;
	const quote = req.body;

	const newQuoteInfo = {
		content: quote.content,
		author: quote.author,
	};

	Quote.findByIdAndUpdate(id, newQuoteInfo, { new: true })
		.then((modifiedQuote) => {
			res.sendStatus(202).json(modifiedQuote);
		})
		.catch(next);
}

function createQuote(req, res, next) {
	const quote = req.body;

	if (!quote || !quote.content || !quote.author) {
		return res.sendStatus(400).json({
			error: "either 'content' or 'author' fields are missing",
		});
	}

	const newQuote = new Quote({
		content: quote.content,
		date: new Date().toISOString(),
		author: quote.author,
	});

	newQuote
		.save()
		.then((createdQuote) => {
			res.sendStatus(201).json(createdQuote);
		})
		.catch(next);
}

module.exports = {
	getAllQuotes,
	getQuote,
	deleteQuote,
	modifyQuote,
	createQuote,
};
