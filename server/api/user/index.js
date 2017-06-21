'use strict';

import express from 'express';
import isAuthenticated from '../utils/api.utils';
import { index, indexByName, relatedUsers, me, show, upsert, create, destroy, isUserAuthenticated } from './user.controller';

const router = express.Router();

router.get('/', isAuthenticated, index);
router.get('/isAuthenticated', isUserAuthenticated);
router.get('/byName/:name', isAuthenticated, indexByName);
router.get('/relatedUsers', isAuthenticated, relatedUsers);
router.get('/me', isAuthenticated, me);
router.get('/:id', isAuthenticated, show);
router.put('/:id', isAuthenticated, upsert);
router.post('/', isAuthenticated, create);
router.delete('/:id', isAuthenticated, destroy);

module.exports = router;
