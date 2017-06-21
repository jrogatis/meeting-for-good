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

export { isAuthenticated, respondWithResult, removeEntity };
