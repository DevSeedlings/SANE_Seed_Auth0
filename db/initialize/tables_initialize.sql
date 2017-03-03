CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name_first text,
  name_last text,
  email text UNIQUE
);
