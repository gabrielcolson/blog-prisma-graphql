import { PrismaClient } from 'nexus-plugin-prisma/client';

export interface Context {
  db: PrismaClient;
}

const prisma = new PrismaClient();

export const createContext = (): Context => ({
  db: prisma,
});
