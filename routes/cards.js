const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardValidation, cardIdValidation } = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', cardValidation, createCard);
cardsRouter.delete('/:_id', cardIdValidation, deleteCard);
cardsRouter.put('/:_id/likes', cardIdValidation, likeCard);
cardsRouter.delete('/:_id/likes', cardIdValidation, dislikeCard);

module.exports = cardsRouter;
