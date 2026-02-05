import { v7 as uuidv7 } from 'uuid';

export class Secret {
  private constructor(
    private readonly _id: string,          
    private readonly _userId: string,
    private _site: string,
    private _identifier: string,
    private _password: string
  ) {}

  public static create(
    userId: string, 
    siteName: string, 
    identifier: string,
    password: string,
  ) {
    const id = uuidv7();
    return new Secret(id, userId, siteName, identifier, password);
  }

  public static build(
    id: string,
    userId: string,
    site: string,
    identifier: string,
    password: string
  ) {
    return new Secret(id, userId, site, identifier, password);
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get identifier(): string {
    return this._identifier;
  }

  get siteName(): string {
    return this._site;
  }

  get password(): string {
    return this._password;
  } 
}