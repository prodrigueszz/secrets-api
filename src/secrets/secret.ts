export class Secret {
  private constructor(
    private readonly userId: string,
    private _site: string,
    private _identifier: string,
    private _password: string,
    private readonly id: string = ""          
  ) {}

  public static create(
    userId: string, 
    site: string, 
    identifier: string,
    password: string,
  ) {
    return new Secret(userId, site, identifier, password);
  }

  get ientifier(): string {
    return this._identifier;
  }

  get site(): string {
    return this._site;
  }

  get password(): string {
    return this._password;
  } 
}