export interface CrudService<T> {
  token: string;

  constructor: (token: string) => void;

  getAll: () => Promise<T[]>;

  getOne: (id: number) => Promise<T>;

  create: (data: T) => Promise<void>;

  update: (id: number, data: T) => Promise<void>;

  delete: (id: number) => Promise<void>;
}
