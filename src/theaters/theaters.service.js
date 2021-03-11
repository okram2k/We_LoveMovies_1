const getAllTheaters = knex => knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.theater_id",
    "t.name",
    "t.address_line_1",
    "t.address_line_2",
    "t.city",
    "t.state",
    "t.zip",
    "t.created_at",
    "t.updated_at",
    "m.movie_id as movies:movie_id",
    "m.title as movies:title",
    "m.runtime_in_minutes as movies:runtime_in_minutes",
    "m.rating as movies:rating",
    "m.description as movies:description",
    "m.image_url as movies:image_url",
    "m.created_at as movies:created_at",
    "m.updated_at as movies:updated_at",
    "mt.is_showing as movies:is_showing",
    "mt.theater_id as movies:theater_id");

module.exports = {
    getAllTheaters,
};
