'use strict';

const express = require('express');
const controller = require('./gg-calendar.controller');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(403).send('Authentication required.');
};

router.get('/', isAuthenticated, controller.index);

module.exports = router;
