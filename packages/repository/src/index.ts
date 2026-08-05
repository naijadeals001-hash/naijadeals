export interface Repository<TEntity, TId> {
  findById(id: TId): Promise<TEntity | null>;
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
}

export interface PaginatedResult<TEntity> {
  items: TEntity[];
  nextCursor?: string;
}

export interface ReadRepository<TEntity, TFilters = Record<string, unknown>> {
  findMany(filters: TFilters): Promise<PaginatedResult<TEntity>>;
}

export interface UnitOfWork {
  runInTransaction<T>(handler: () => Promise<T>): Promise<T>;
}

export * from './identity.js';
export * from './prisma/index.js';
