import { prisma_1 } from "../prisma/db";
import { prisma_2 } from "../prisma-second/db";
import { ROLES } from "@prisma/client";

export const resolvers = {
  Query: {
    users: () => {
      return prisma_1.user.findMany();
    },
    user: (_: any, args: { data: { id: string } }) => {
      return prisma_1.user.findMany({
        where: {
          id: args.data.id,
        },
      });
    },
    usersSecondDb: () => {
      return prisma_2.user.findMany();
    },
  },

  Post: {
    author: (parent: any) => {
      return prisma_2.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
    },
  },

  Mutation: {
    createUser: (_: any, args: any, _request: Request, _k: any) => {
      return prisma_1.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          role: args.data.role,
        },
      });
    },
    createUserSecondDb: (
      _: any,
      args: {
        data: {
          name: string;
          email: string;
          role: ROLES;
        };
      },
      _request: Request,
      _k: any
    ) => {
      return prisma_2.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          role: args.data.role,
        },
      });
    },
    createPost: (
      _: any,
      args: {
        data: {
          title: string;
          content: string;
          published: boolean;
          authorId: string;
        };
      },
      _request: Request,
      _k: any
    ) => {
      return prisma_2.post.create({
        data: {
          title: args.data.title,
          content: args.data.content,
          published: args.data.published,
          authorId: args.data.authorId,
        },
      });
    },
  },
};
