import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

import ibmdb from 'ibm_db'

export default new GraphQLObjectType({
  description: 'global mutation object',
  name: 'Mutation',
  fields: () => ({
    runSql: {
      type: GraphQLString,
      args: {
        sql: {type: GraphQLString},
        bindParameters: {type: new GraphQLList(GraphQLString)}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          return runDB2Sql(args.sql, args.bindParameters)
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
          const sql = `insert into "accounts" ("id", "email_address", "first_name", "last_name") values (?, ?, ?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      }
    },
    addPost: {
      type: GraphQLString,
      args: {
        id: {type: GraphQLInt},
        body: {type: GraphQLString},
        author_id: {type: GraphQLInt},
        archived: {type: GraphQLInt}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into "posts" ("id", "body", "author_id", "archived") values (?, ?, ?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      },
    },
    addComment: {
      type: GraphQLString,
      args: {
        id: {type: GraphQLInt},
        body: {type: GraphQLString},
        post_id: {type: GraphQLInt},
        author_id: {type: GraphQLInt},
        archived: {type: GraphQLInt}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into "comments" ("id", "body", "post_id", "author_id", "archived") values (?, ?, ?, ?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      },
    },
    addRelationship: {
      type: GraphQLString,
      args: {
        follower_id: {type: GraphQLInt},
        followee_id: {type: GraphQLInt},
        closeness: {type: GraphQLString},
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into "relationships" ("follower_id", "followee_id", "closeness") values (?, ?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      },
    },
    addLike: {
      type: GraphQLString,
      args: {
        account_id: {type: GraphQLInt},
        comment_id: {type: GraphQLInt}
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into "likes" ("account_id", "comment_id") values (?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      },
    },
    addSponsor: {
      type: GraphQLString,
      args: {
        generation: {type: GraphQLInt},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
      },
      resolve: (parent, args, context, resolveInfo) => {
        if (process.env.DB === 'DB2') {
          const sql = `insert into "sponsors" ("generation", "first_name", "last_name") values (?, ?, ?)`;
          console.log(`Args: ${JSON.stringify(args, ' ', 2)}`)
          const bindParameters = Object.values(args)
          console.log(`Bind Parameters: ${bindParameters}`)
          return runDB2Sql(sql, bindParameters)
          // console.log(`SQL: ${sql}`)
          return 'OK'
        } else {
          throw new Error(`Database ${process.env.DB} has not been setup in the testcase setup GraphQL mutation.`)
        }
      },
    },
  })
})

function runDB2Sql(sql, bindParameters) {
  console.log(`Run SQL: ${sql}`)
  return new Promise((resolve, reject) => {
    ibmdb.open(process.env.DB2_URL, (err, conn) => {
      if (err) {
        throw new Error(`Could not connect to DB2 - ${process.env.DB2_URL} - Error: ${err}`)
      } else {
        conn.prepare(sql, (err, stmt) => {
          if (err) {
            reject(err)
          } else {
            stmt.execute(bindParameters, (err, result) => {
              if (err) {
                conn.close();
                reject(err)
              } else {
                conn.close();
                resolve('OK')
              }
            })
          }
        })
      }
    })
  })
}