import ibmdb from 'ibm_db'
import assert from 'assert'
import {
  dropAccountsTable,
  createAccountsTable
} from '../schema/db2'


module.exports = async db => {
  //Sets up the database schema on DB2
  // const knex = await require('../schema/setup')(db2, 'test1')


  if (db === 'db2') {
    console.log('Using DB2')
    //TODO -- Set up database schema
    assert(process.env.DB2_URL, 'Must provide environment variable DB2_URL, e.g. "DRIVER={DB2};DATABASE=MYDB;UID=username;PWD=password;HOSTNAME=MY.HOST.NAME;port=50000;currentSchema=MYSCHEMA"')
    var conn;
    try {
      conn = ibmdb.openSync(process.env.DB2_URL)
      
      var stmt
      var results
      
      try {
        console.log('Dropping accounts table...')
        stmt = conn.prepareSync(dropAccountsTable)
        results = stmt.executeSync()
        results.closeSync()
        stmt.closeSync()
      } catch (e) {
        console.log('Error dropping accounts table.  Maybe it wasn\'t there...')
      }

      try {
        console.log('Creating accounts table...')
        stmt = conn.prepareSync(createAccountsTable)
        results = stmt.executeSync()
        results.closeSync()
        stmt.closeSync()
      } catch (e) {
        console.log('Error dropping accounts table.  Maybe it wasn\'t there...')
      }

      // try {
      //   console.log('Creating accounts table...')
      //   stmt = conn.prepareSync(createAccountsTable)
      //   results = stmt.executeSync()
      //   results.closeSync()
      //   stmt.closeSync()
      // } catch (e) {
      //   console.log('Error creating accounts table.  Maybe it was already there...')
      // }


      // results = querySync(conn, createAccountsTable, [])
      // console.log(JSON.stringify(results, ' ', 2))
  
      // results = querySync(conn, "select 'ok2' from sysibm.sysdummy1", [])
      // console.log(JSON.stringify(results, ' ', 2))
  
      conn.closeSync()
    } catch (e) {
      throw new Error(e)
    }
  }
}

function querySync(conn, sql, bindParameters) {
  try {
    return conn.querySync(sql, bindParameters);
  } catch (e) {
    console.log(`SQL Error on statement: ${sql}`)
  }
}