import assert from 'assert'
import path from 'path'
import ibmdb from 'ibm_db'

function getDbType() {
  return process.env.DB
}

function getConnection() {
  const connection = process.env.NODE_ENV !== 'test' ?
  { filename: path.join(__dirname, '../data/db/test1-data.sl3') } :
  getDbType() === 'PG' ?
    pgUrl('test1') :
    getDbType() === 'MYSQL' ?
      mysqlUrl('test1') :
      getDbType() === 'ORACLE' ?
        oracleUrl('test1') : 
        getDbType() === 'DB2' ? 
            db2Url('test1') : 
        { filename: path.join(__dirname, '../data/db/test1-data.sl3') }

  return connection
}

function getClient() {
  let client = 'sqlite3'
  if (getDbType() === 'PG') {
    client = 'pg'
  } else if (getDbType() === 'MYSQL') {
    client = 'mysql'
  } else if (getDbType() === 'ORACLE') {
    client = 'oracledb'
  } else if (getDbType() === 'DB2') {
    client = 'db2'
  }

  return client
}

let database = undefined
if (getDbType() !== 'DB2') {
  console.log('connection to', { client: getClient(), connection: getConnection() })
  database = require('knex')({
    client: getClient(),
    connection: getConnection(),
    useNullAsDefault: true
  })
}
export default database

function pgUrl(dbName) {
  assert(process.env.PG_URL, 'Environment variable PG_URL must be defined, e.g. "postgres://user:pass@localhost/"')
  return process.env.PG_URL + dbName
}

function mysqlUrl(dbName) {
  assert(process.env.MYSQL_URL, 'Environment variable MYSQL_URL must be defined, e.g. "mysql//user:pass@localhost/"')
  return process.env.MYSQL_URL + dbName
}

function oracleUrl(dbName) {
  assert(process.env.MYSQL_URL, 'Environment variable ORACLE_URL must be defined, e.g. "pass@localhost:port/sid"')
  const [ password, connectString ] = process.env.ORACLE_URL.split('@')
  return { user: dbName, password, connectString, stmtCacheSize: 0 }
}

function db2Url(dbName) {
  console.log('getting db2 connection')
  assert(process.env.DB2_URL, 'Environment variable DB2_URL must be defined.')
  return { connectString: process.env.DB2_URL }
}


export function databaseCall(sql, context) {
  
    //needs to return a function like dbCall...
  
    
    if (context) {
      context.set('X-SQL-Preview', context.response.get('X-SQL-Preview') + '%0A%0A' + sql.replace(/%/g, '%25').replace(/\n/g, '%0A'))
    }
  
    const client = getClient()
    const connection = getConnection()
    if (getDbType() === 'DB2') {
      return new Promise((resolve, reject) => {
        ibmdb.open(connection.connectString, (err, conn) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          
          console.log('DB2 SQL:\n', sql)
          conn.query(sql, [], (err, results) => {
            if (err) {
              console.log(err)
              reject(err)
            }
            // console.log(JSON.stringify(results, ' ', 2))
            resolve(results)
          })
  
          conn.close()
        })
      })
    } else {
      let knex = require('knex')({ client, connection, useNullAsDefault: true })
      return knex.raw(sql).then(result => {
        if (knex.client.config.client === 'mysql') {
          return result[0]
        }
        return result
      })
    }
  }