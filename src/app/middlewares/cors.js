module.exports = (req, res, next) => {
  // wildcard -> allow access from any origin
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "3600"); // por quanto tempo o navegador pode cachear a resposta do preflight (em segundos)
  next();
};
