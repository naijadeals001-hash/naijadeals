import { AsyncLocalStorage } from 'node:async_hooks';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { UnitOfWork } from '../index.js';

export type PrismaTransactionClient = PrismaClient | Prisma.TransactionClient;

export interface PrismaTransactionContext {
  readonly client: PrismaClient;
  readonly storage: AsyncLocalStorage<PrismaTransactionClient>;
  runInTransaction<T>(handler: () => Promise<T>): Promise<T>;
  getClient(): PrismaTransactionClient;
}

export function createPrismaTransactionContext(client: PrismaClient): PrismaTransactionContext {
  const storage = new AsyncLocalStorage<PrismaTransactionClient>();

  return {
    client,
    storage,
    async runInTransaction<T>(handler: () => Promise<T>): Promise<T> {
      return client.$transaction(async (tx) => storage.run(tx, handler));
    },
    getClient(): PrismaTransactionClient {
      return storage.getStore() ?? client;
    }
  };
}

export function createPrismaUnitOfWork(context: PrismaTransactionContext): UnitOfWork {
  return {
    async runInTransaction<T>(handler: () => Promise<T>): Promise<T> {
      return context.runInTransaction(handler);
    }
  };
}
