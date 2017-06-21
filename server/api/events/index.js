'use strict';

import express from 'express';
import isAuthenticated from '../utils/api.utils';
import { index, indexByUser, indexById, showFull, show, create, upsert, GuestNotificationDismiss, patch, setGuestInactive, setFalse } from './events.controller';

const router = express.Router();

router.get('/', isAuthenticated, index);
router.get('/getByUser/:actualDate?', isAuthenticated, indexByUser);
router.get('/getbyuid/:uid', isAuthenticated, indexById);
router.get('/getFull/:id', isAuthenticated, showFull);
router.get('/:id', isAuthenticated, show);
router.post('/', isAuthenticated, create);
router.put('/:id', isAuthenticated, upsert);
router.patch('/GuestNotificationDismiss/:id', isAuthenticated, GuestNotificationDismiss);
router.patch('/:id', isAuthenticated, patch);
router.delete('/participant/:id', isAuthenticated, setGuestInactive);
router.delete('/:id', isAuthenticated, setFalse);

module.exports = router;
