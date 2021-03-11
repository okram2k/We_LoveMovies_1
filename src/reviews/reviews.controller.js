const service = require("./reviews.service.js");
const treeize = require("../utils/treeize");

async function reviewExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: "Review cannot be found." };
  const { reviewId } = req.params;
  if (!reviewId) return next(error);

  let review = await service.read(knexInstance, reviewId);
  if (!review) return next(error);
  res.locals.review = review;
  next();
}

async function create(req, res, next) {
  const knexInstance = req.app.get("db");
  let newReview = await service.create(
    knexInstance,
    req.body.data
  );
  newReview = treeize(newReview);
  if (newReview instanceof Error) return next({ message: newReview.message });
  
  res.status(201).json({ data: newReview });
}

async function update(req, res, next) {
  const {
    review: { review_id: reviewId, ...review },
  } = res.locals;
  const knexInstance = req.app.get("db");
  
  const updatedReview = { ...review, ...req.body.data };

  let newReview = await service.update(
    knexInstance,
    reviewId,
    updatedReview
  );
  newReview = await service.readRC(knexInstance, reviewId);
  newReview = treeize(newReview);
  if (newReview instanceof Error) return next({ message: newReview.message });
  res.json({ data: newReview[0] });
}

async function destroy(req, res, next) {
  const knexInstance = req.app.get("db");
  const { review } = res.locals;
  await service.destroy(knexInstance, review.review_id);
  res.sendStatus(204);
}

module.exports = {
  create: [create],
  update: [reviewExists, update],
  destroy: [reviewExists, destroy],
};
