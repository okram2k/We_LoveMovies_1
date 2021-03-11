const service = require("./movies.service");
const treeize = require("../utils/treeize");


async function movieExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: `Movie cannot be found.` };
  const { movieId } = req.params;
  if (!movieId) return next(error);

  let movie = await service.read(knexInstance, movieId);
  //console.log(movieId, movie, !movie);
  if (!movie) return next(error);
  res.locals.movie = movie;
  next();
}

async function list(req, res, next) {
  //console.log("list");
  const knexInstance = req.app.get("db");
  let movies = await service.list(knexInstance);
  movies = treeize(movies);
  if (movies instanceof Error) return next({ message: movies.message });
  res.json({ data: movies });
}

async function listShowing(req, res, next) {
  //console.log("listshowing");
  const knexInstance = req.app.get("db");
  let movies = await service.listShowing(knexInstance);
  movies = treeize(movies);
  if (movies instanceof Error) return next({ message: movies.message });
  res.json({ data: movies });
}

async function read(req, res, next) {
  //console.log("reading!");
  const knexInstance = req.app.get("db");
  const { movie } = res.locals;
  //console.log(movie);
  res.json({ data: movie });
}
async function readTheaters(req, res, next) {
  //console.log("readtheaters");
    const knexInstance = req.app.get("db");
    const { movieId } = req.params;
    res.json({ data: await service.readTheaters(knexInstance, movieId) });
}
async function readReviews(req, res, next) {
  //console.log("readreviews");
    const knexInstance = req.app.get("db");
    const { movieId } = req.params;
    let review = await service.readReviews(knexInstance, movieId);

    review = treeize(review);
    if (review instanceof Error) return next({ message: review.message });
    res.json({ data: review });
}

module.exports = {
  list: [list],
  listShowing: [listShowing],
  read: [movieExists, read],
  readTheaters: [movieExists, readTheaters],
  readReviews: [movieExists, readReviews],
};
