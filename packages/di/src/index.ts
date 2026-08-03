export type ServiceToken<T> = symbol & { __type?: T };

export class Container {
  private readonly values = new Map<symbol, unknown>();

  public registerValue<T>(token: ServiceToken<T>, value: T): void {
    this.values.set(token, value);
  }

  public resolve<T>(token: ServiceToken<T>): T {
    if (!this.values.has(token)) {
      throw new Error(`Service token '${String(token)}' is not registered`);
    }
    return this.values.get(token) as T;
  }
}

export const createToken = <T>(description: string): ServiceToken<T> =>
  Symbol(description) as ServiceToken<T>;
