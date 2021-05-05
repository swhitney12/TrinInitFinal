CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL,
  major varchar(50) NOT NULL,
  graduationYear int NOT NULL,
  githubLink varchar(50)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  ownerId int REFERENCES users(id) ON DELETE CASCADE,
  name varchar(20) NOT NULL,
  likes int NOT NULL,
  description varchar(2000) NOT NULL,
  repositoryLink varchar(100),
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projectComments (
  id SERIAL PRIMARY KEY,
  projectId int REFERENCES projects(id) ON DELETE CASCADE,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comment varchar(2000) NOT NULL,
);