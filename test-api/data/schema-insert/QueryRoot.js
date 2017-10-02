import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

export default new GraphQLObjectType({
  description: 'dummy query type',
  name: 'Query',
  fields: () => ({
    dummy: {
      description: 'dummy query',
      type: GraphQLString, 
      resolve: () => {
        return 'DUMMY'
      }
    }
  })
})