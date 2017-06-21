'use strict';

import express from 'express';
import { ownerNotification, sendInvite, ownerNotificationForEdit } from './email.controller';
import isAuthenticated from '../utils/api.utils';

const router = express.Router();

router.post('/ownerNotification', isAuthenticated, ownerNotification);
router.post('/sendInvite', isAuthenticated, sendInvite);
router.post('/ownerNotificationForEventEdit', isAuthenticated, ownerNotificationForEdit);

module.exports = router;
