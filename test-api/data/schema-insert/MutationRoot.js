import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

import ibmdb from 'ibm_db'

export default new GraphQLObjectType({
  description: 'global mutation object',
  name: 'Mutation',
  fields: () => ({
    runSql: {
      type: GraphQLString,
      args: {
        sql: {type: GraphQLString}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          return runDB2Sql(args.sql, [])
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      }
    },
    addAccount: {
      type: GraphQLString,
      args: {
        id: {type: GraphQLInt},
        email_address: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into accounts (id, email_address, first_name, last_name) values (?, '?', '?', '?')`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          // return runDB2Sql(sql, bindParameters)
          console.log(`SQL: ${sql}`)
          console.log(`Bind Parameters: ${bindParameters}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      }
    }
  })
})

function runDB2Sql(sql, bindParameters) {
  console.log(`Run SQL: ${sql}`)
  return new Promise((resolve, reject) => {
    ibmdb.open(process.env.DB2_URL, (err, conn) => {
      if (err) {
        throw new Error(`Could not connect to DB2 - ${process.env.DB2_URL} - Error: ${err}`)
      } else {
        conn.query(sql, bindParameters, (err, results) => {
          if (err) {
            reject(`DB2 SQL error: ${err}`)
          } else {
            console.log(JSON.stringify(results, ' ', 2))
            resolve('OK')
          }
        })
        conn.close();
      }
    })
  })
}