const create = (knex, review) => {
    return knex("reviews").insert(review).returning("*");
  };
  
  const read = (knex, reviewId) =>
  knex("reviews").select("*").where({ review_id: reviewId }).first();
  
  const update = (knex, reviewId, updatedReview) => {
    return knex("reviews")
      .select("*")
      .where({ review_id: reviewId })
      .update(updatedReview, "*");
  };

  const readRC = (knex, reviewId) =>
  knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.review_id",
  "r.content",
  "r.score",
  "r.created_at",
  "r.updated_at",
  "r.critic_id",
  "r.movie_id",
  "c.critic_id as critic:critic_id",
  "c.preferred_name as critic:preferred_name",
  "c.surname as critic:surname",
  "c.organization_name as critic:organization_name",
  "c.created_at as critic:created_at",
  "c.updated_at as critic:updated_at")
  .where({ review_id: reviewId });
  
  const destroy = (knex, reviewId) => {
    return knex("reviews").where({ review_id: reviewId }).del();
  };
  
  module.exports = {
    create,
    read,
    readRC,
    update,
    destroy,
  };
  