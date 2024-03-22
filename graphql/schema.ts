import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    role: ROLES
  }

  type Post {
    id: String!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    authorId: String!
    createdAt: String!
    updatedAt: String
  }

  enum ROLES {
    ADMIN
    USER
  }

  type Query {
    users: [User]!
    usersSecondDb: [User]!
    user(id: String!): User
  }

  input UserInput {
    name: String!
    email: String!
    role: ROLES
  }

  input PostInput {
    title: String!
    content: String!
    published: Boolean!
    authorId: String!
  }

  type Mutation {
    createUser(data: UserInput!): User!
    createUserSecondDb(data: UserInput!): User!
    createPost(data: PostInput!): Post!
  }
`;
