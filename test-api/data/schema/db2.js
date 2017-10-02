const dropAccountsTable = `DROP TABLE accounts`;
const createAccountsTable = `CREATE TABLE accounts (
  id INTEGER,
  email_address VARCHAR(150),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  num_legs INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = {
  dropAccountsTable,
  createAccountsTable
}