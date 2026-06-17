module.exports = (error, req, res, _next) => {
  console.log("####### ERROR HANDLER");
  console.log(error);
  res.sendStatus(500);
};
