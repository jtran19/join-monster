module.exports.dropAccountsTable = `DROP TABLE "accounts"`;
module.exports.createAccountsTable = `CREATE TABLE "accounts" (
  "id" INTEGER NOT NULL,
  "email_address" VARCHAR(150),
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "num_legs" INTEGER DEFAULT 2,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY("id")
)`;

module.exports.dropCommentsTable = `DROP TABLE "comments"`;
module.exports.createCommentsTable = `CREATE TABLE "comments" (
  "id" INTEGER NOT NULL,
  "body" VARCHAR(4000) NOT NULL,
  "post_id" INTEGER NOT NULL,
  "author_id" INTEGER NOT NULL,
  "archived" SMALLINT DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY("id")
)`;

module.exports.dropPostsTable = `DROP TABLE "posts"`;
module.exports.createPostsTable = `CREATE TABLE "posts" (
  "id" INTEGER NOT NULL,
  "body" VARCHAR(4000) NOT NULL,
  "author_id" INTEGER NOT NULL,
  "archived" SMALLINT DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY("id")
)`;


module.exports.dropRelationshipsTable = `DROP TABLE "relationships"`;
module.exports.createRelationshipsTable = `CREATE TABLE "relationships" (
  "follower_id" INTEGER NOT NULL,
  "followee_id" INTEGER NOT NULL,
  "closeness" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("follower_id", "followee_id")
)`;

module.exports.dropLikesTable = `DROP TABLE "likes"`;
module.exports.createLikesTable = `CREATE TABLE "likes" (
  "account_id" INTEGER NOT NULL,
  "comment_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("account_id", "comment_id")
)`;

module.exports.dropSponsorsTable = `DROP TABLE "sponsors"`;
module.exports.createSponsorsTable = `CREATE TABLE "sponsors" (
  "generation" INTEGER NOT NULL,
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "num_legs" INTEGER DEFAULT 2,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;