const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Произошла ошибка: Переданы некорректные данные при создании карточки - ${err}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: card._id })
          .then(res.send({ message: 'Карточка удалена' }));
      } else if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(new ForbiddenError('У вас нет прав на удаление данной карточки'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Передан невалидный id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ message: 'Поставлен лайк' });
      }
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Произошла ошибка: Переданы некорректные данные для постановки лайка'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Передан невалидный id'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ message: 'Удалён лайк' });
      }
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Произошла ошибка: Переданы некорректные данные для удаления лайка'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Передан невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
