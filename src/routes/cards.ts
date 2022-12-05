import { Router } from 'express';
import {createCard, dislikeCard, getAllCards, likeCard, removeCard} from '../controllers/cards';

const router = Router();

router.post('/cards', createCard);
router.get('/cards', getAllCards);
router.delete('/cards/:cardId', removeCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

export { router };