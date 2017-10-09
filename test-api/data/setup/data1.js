import { graphql } from 'graphql'
import schema from '../schema-insert/index'

const testData1 = {
  accounts: [
    {
      id: 1,
      email_address: 'andrew@stem.is',
      first_name: 'andrew',
      last_name: 'carlson'
    },
    {
      id: 2,
      email_address: 'matt@stem.is',
      first_name: 'matt',
      last_name: 'elder'
    },
    {
      id: 3,
      email_address: 'foo@example.org',
      first_name: 'foo',
      last_name: 'bar'
    }
  ],
  posts: [
    {
      id: 1,
      body: 'If I could marry a programming language, it would be Haskell.',
      author_id: 2, 
      archived: false
    },
    {
      id: 2,
      body: 'Check out this cool new GraphQL library, Join Monster.',
      author_id: 1, 
      archived: false
    },
    {
      id: 3,
      body: 'Here is who to contact if your brain has been ruined by Java.',
      author_id: 2,
      archived: true
    },
    {
      id: 4,
      body: 'I have no valid author...',
      author_id: 12, 
      archived: false
    }
  ],
  comments: [
    {
      id: 1,
      body: 'Wow this is a great post, Matt.',
      post_id: 1,
      author_id: 1, 
      archived: false
    },
    {
      id: 2,
      body: 'That\'s super weird dude.',
      post_id: 1,
      author_id: 3,
      archived: true
    },
    {
      id: 3,
      body: 'That\'s ultra weird bro.',
      post_id: 1,
      author_id: 3, 
      archived: false
    },
    {
      body: 'Do not forget to check out the demo.',
      id: 4,
      post_id: 2,
      author_id: 1, 
      archived: false
    },
    {
      id: 5,
      body: 'This sucks. Go use REST you scrub.',
      post_id: 2,
      author_id: 3, 
      archived: false
    },
    {
      id: 6,
      body: 'Also, submit a PR if you have a feature you want to add.',
      post_id: 2,
      author_id: 1, 
      archived: false
    },
    {
      id: 7,
      body: 'FIRST COMMENT!',
      post_id: 2,
      author_id: 2,
      archived: true
    },
    {
      id: 8,
      body: 'Somebody please help me with this library. It is so much work.',
      post_id: 2,
      author_id: 1, 
      archived: false
    },
    {
      id: 9,
      body: 'Yeah well Java 8 added lambdas.',
      post_id: 3,
      author_id: 3, 
      archived: false
    }
  ],
  relationships: [
    {
      follower_id: 1,
      followee_id: 2,
      closeness: 'acquaintance'
    },
    {
      follower_id: 3,
      followee_id: 2,
      closeness: 'best'
    },
    {
      follower_id: 3,
      followee_id: 1,
      closeness: 'acquaintance'
    }
  ],
  likes: [
    {
      account_id: 2,
      comment_id: 1,
    },
    {
      account_id: 1,
      comment_id: 3
    },
    {
      account_id: 3,
      comment_id: 3
    },
    {
      account_id: 1,
      comment_id: 9
    },
    {
      account_id: 2,
      comment_id: 9
    }
  ],
  sponsors: [
    {
      generation: 1,
      first_name: 'erlich',
      last_name: 'bachman'
    },
    {
      generation: 1,
      first_name: 'andrew',
      last_name: 'bachman'
    },
    {
      generation: 2,
      first_name: 'erlich',
      last_name: 'bachman'
    },
    {
      generation: 2,
      first_name: 'matt',
      last_name: 'bachman'
    },
    {
      generation: 1,
      first_name: 'matt',
      last_name: 'daemon'
    }
  ]
}

module.exports = db => {
  const addAccountsMutation = `
    mutation AddAccounts($id: Int $email_address: String $first_name: String $last_name: String) {
      addAccount(id: $id email_address: $email_address first_name: $first_name last_name: $last_name)
    }
  `;
  testData1.accounts.forEach(a => {
    graphql(schema, addAccountsMutation, null, null, a)
  })

  const addCommentsMutation = `
    mutation AddComments($id:Int $body:String $post_id:Int $author_id:Int $archived:Int) {
      addComment(id:$id body:$body post_id:$post_id author_id:$author_id archived:$archived)
    }
  `;
  testData1.comments.forEach(a => {
    graphql(schema, addCommentsMutation, null, null, a)
  })

  const addPostsMutation = `
    mutation AddPosts($id:Int $body:String $author_id:Int $archived:Int) {
      addPost(id:$id body:$body author_id:$author_id archived:$archived)
    }
  `;
  testData1.posts.forEach(a => {
    graphql(schema, addPostsMutation, null, null, a)
  })

  const addRelationshipsMutation = `
    mutation AddRelationships($follower_id:Int $followee_id:Int $closeness:String) {
      addRelationship(follower_id:$follower_id followee_id:$followee_id closeness:$closeness)
    }
  `;
  testData1.relationships.forEach(a => {
    graphql(schema, addRelationshipsMutation, null, null, a)
  })

  const addLikesMutation = `
    mutation AddLikes($account_id:Int $comment_id:Int) {
      addLike(account_id:$account_id comment_id:$comment_id)
    }
  `;
  testData1.likes.forEach(a => {
    graphql(schema, addLikesMutation, null, null, a)
  })
  
  const addSponsorsMutation = `
    mutation AddSponsors($generation:Int $first_name:String $last_name:String) {
      addSponsor(generation:$generation first_name:$first_name last_name:$last_name)
    }
  `;
  testData1.sponsors.forEach(a => {
    graphql(schema, addSponsorsMutation, null, null, a)
  })
}