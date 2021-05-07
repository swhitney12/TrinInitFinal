CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL,
  major varchar(50) NOT NULL,
  graduationYear int NOT NULL,
  githubLink varchar(50)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag varchar(50) NOT NULL
);

CREATE TABLE userTags (
  userId int REFERENCES users(id) ON DELETE CASCADE,
  tagId int REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  ownerId int REFERENCES users(id) ON DELETE CASCADE,
  name varchar(20) NOT NULL,
  description varchar(2000) NOT NULL,
  repositoryLink varchar(100),
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projectLikes (
  userId int REFERENCES users(id) ON DELETE CASCADE,
  projectId int REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE userProjects(
  userId int REFERENCES users(id) ON DELETE CASCADE,
  projectId int REFERENCES projects(id) ON DELETE CASCADE 
);

CREATE TABLE projectTags(
  projectId int REFERENCES projects(id) ON DELETE CASCADE,
  tagId int REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE projectComments (
  id SERIAL PRIMARY KEY,
  projectId int REFERENCES projects(id) ON DELETE CASCADE,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comment varchar(2000) NOT NULL
);