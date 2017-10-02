import { GraphQLSchema } from 'graphql'

import QueryRoot from './QueryRoot'
import MutationRoot from './MutationRoot'

export default new GraphQLSchema({
  description: 'a GraphQL schema for inserting test data via mutations',
  query: QueryRoot,
  mutation: MutationRoot
})