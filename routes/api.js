const express = require('express');

const router = express.Router();

const {
	getAllQuotes,
	getQuote,
	deleteQuote,
	modifyQuote,
	createQuote,
} = require('../services/quoteServices');

router.get('/', getAllQuotes);
router.get('/:id', getQuote);
router.delete('/:id', deleteQuote);
router.put('/:id', modifyQuote);
router.post('/', createQuote);

module.exports = router;
