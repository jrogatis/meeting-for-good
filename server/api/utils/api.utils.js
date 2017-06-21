import jsonpatch from 'fast-json-patch';

const isAuthenticated = (req, res, next) => {
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

export { isAuthenticated, respondWithResult, removeEntity, patchUpdates };
