USE Blogs;
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  deletedAt TIMESTAMP
);
CREATE TABLE posts (
  id serial PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  categoryId INT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  deletedAt TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);
INSERT INTO categories (name, createdAt, updatedAt)
VALUES ('Varios', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Desarrollo',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Anécdotas',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Historias',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Pensamientos',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );