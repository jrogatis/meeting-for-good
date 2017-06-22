'use strict';

import express from 'express';
import { listCalendars } from './gg-calendar.controller';
import { isAuth } from '../utils/api.utils';

const router = express.Router();

router.get('/list', isAuth, listCalendars);

module.exports = router;
