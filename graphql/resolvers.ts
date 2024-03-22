import { $Enums, PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaClientSecond } from "@internal/prisma-second/client";

const prisma = new PrismaClient({
  log: ["query"],
});
const prismaSecond = new PrismaClientSecond({
  log: ["query"],
});

export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: (_: any, args: { data: { id: string } }) => {
      return prisma.user.findMany({
        where: {
          id: args.data.id,
        },
      });
    },
    usersSecondDb: () => {
      return prismaSecond.user.findMany();
    },
    // Post User relation query
  },
  Post: {
    author: (parent: any) => {
      console.log("parent", parent);
      return prismaSecond.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
    },
  },

  Mutation: {
    createUser: (_: any, args: any, _request: Request, _k: any) => {
      return prisma.user.create({
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
          role: $Enums.ROLES;
        };
      },
      _request: Request,
      _k: any
    ) => {
      return prismaSecond.user.create({
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
      return prismaSecond.post.create({
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
