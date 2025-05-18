export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
};
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Not Found" });
};
