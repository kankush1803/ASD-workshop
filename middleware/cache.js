const cache = new Map();

const TTL = 60 * 1000; // 1 minute

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  const cached = cache.get(key);

  if (!cached) {
    res.set("X-Cache", "MISS");
    return next();
  }

  const age = Date.now() - cached.createdAt;

  if (age > TTL) {
    cache.delete(key);
    res.set("X-Cache", "MISS");
    return next();
  }

  res.set("X-Cache", "HIT");
  return res.json(cached.data);
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    createdAt: Date.now()
  });
};

const clearCache = () => {
  cache.clear();
};

module.exports = {
  cache,
  cacheMiddleware,
  setCache,
  clearCache
};
