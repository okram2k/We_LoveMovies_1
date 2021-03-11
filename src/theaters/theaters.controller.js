const service = require("./theaters.service");
const treeize = require("../utils/treeize");

async function list(req, res, next) {
  const knexInstance = req.app.get("db");
  let theaters = await service.getAllTheaters(knexInstance);
  theaters = treeize(theaters);
  if (theaters instanceof Error) return next({ message: theaters.message });
  res.json({ data: theaters });
}

module.exports = {
  list: [list],
};
