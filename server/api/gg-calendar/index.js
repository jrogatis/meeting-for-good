'use strict';

import express from 'express';
import { listCalendars } from './gg-calendar.controller';
import isAuthenticated from '../utils/api.utils';

const router = express.Router();


router.get('/list', isAuthenticated, listCalendars);

module.exports = router;
