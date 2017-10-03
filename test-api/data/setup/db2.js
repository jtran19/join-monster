import ibmdb from 'ibm_db'
import assert from 'assert'
import {
  dropAccountsTable,
  createAccountsTable,
  dropCommentsTable,
  createCommentsTable,
  dropPostsTable,
  createPostsTable,
  dropRelationshipsTable,
  createRelationshipsTable,
  dropLikesTable,
  createLikesTable,
  dropSponsorsTable,
  createSponsorsTable
} from '../schema/db2'


module.exports = db => {
  //Sets up the database schema on DB2
  console.log('Using DB2')
  assert(process.env.DB2_URL, 'Must provide environment variable DB2_URL, e.g. "DRIVER={DB2};DATABASE=MYDB;UID=username;PWD=password;HOSTNAME=MY.HOST.NAME;port=50000;currentSchema=MYSCHEMA"')
  var conn;
  try {
    conn = ibmdb.openSync(process.env.DB2_URL)
    
    var stmt
    var results
    
    //DROPS
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
      console.log('Dropping comments table...')
      stmt = conn.prepareSync(dropCommentsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error dropping comments table.  Maybe it wasn\'t there.')
    }

    try {
      console.log('Dropping posts table...')
      stmt = conn.prepareSync(dropPostsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error dropping posts table.  Maybe it wasn\'t there.')
    }

    try {
      console.log('Dropping relationships table...')
      stmt = conn.prepareSync(dropRelationshipsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error dropping relationships table.  Maybe it wasn\'t there.')
    }

    try {
      console.log('Dropping likes table...')
      stmt = conn.prepareSync(dropLikesTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error dropping likes table.  Maybe it wasn\'t there.')
    }

    try {
      console.log('Dropping sponsors table...')
      stmt = conn.prepareSync(dropSponsorsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error dropping sponsors table.  Maybe it wasn\'t there.')
    }


    //CREATES
    try {
      console.log('Creating accounts table...')
      stmt = conn.prepareSync(createAccountsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating accounts table.')
    }

    try {
      console.log('Creating comments table...')
      stmt = conn.prepareSync(createCommentsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating comments.')
    }

    try {
      console.log('Creating posts table...')
      stmt = conn.prepareSync(createPostsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating posts table.')
    }

    try {
      console.log('Creating relationships table...')
      stmt = conn.prepareSync(createRelationshipsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating relationships table.')
    }

    try {
      console.log('Creating likes table...')
      stmt = conn.prepareSync(createLikesTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating likes table.')
    }

    try {
      console.log('Creating sponsors table...')
      stmt = conn.prepareSync(createSponsorsTable)
      results = stmt.executeSync()
      results.closeSync()
      stmt.closeSync()
    } catch (e) {
      console.log('Error creating sponsors table.')
    }

    conn.closeSync()
  } catch (e) {
    throw new Error(e)
  }
}

function querySync(conn, sql, bindParameters) {
  try {
    return conn.querySync(sql, bindParameters);
  } catch (e) {
    console.log(`SQL Error on statement: ${sql}`)
  }
}