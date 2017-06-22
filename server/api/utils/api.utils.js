import jsonpatch from 'fast-json-patch';

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(403).send('Authentiation required.');
};

const respondWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

const removeEntity = res => (entity) => {
  if (entity) {
    return entity.remove()
      .then(() => {
        res.status(204).end();
      });
  }
};

const patchUpdates = patches => (entity) => {
  try {
    jsonpatch.applyPatch(entity, patches, /* validate */ true);
  } catch (err) {
    console.log('err at patches', err);
    return Promise.reject(err);
  }
  return entity.save();
};


const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return (err) => {
    res.status(statusCode).send(err);
  };
};


const handleEntityNotFound = res => (entity) => {
  if (!entity) {
    res.status(404).end();
    return null;
  }
  return entity;
};


export { isAuth, respondWithResult, removeEntity, patchUpdates, handleError, handleEntityNotFound };
