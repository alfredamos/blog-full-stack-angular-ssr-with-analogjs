export class CookieParam {
  static accessTokenName: string = 'accessToken';
  static accessTokenPath: string = '/';
  static accessTokenMaxAge: number = 24 * 60 * 60 * 60 * 1000;

  static refreshTokenName: string = 'refreshToken';
  static refreshTokenPath: string = '/refresh';
  static refreshTokenMaxAge: number = 7 * 24 * 60 * 60 * 60 * 1000;

  static sessionTokenName: string = 'session';
  static sessionTokenPath: string = '/';
  static sessionTokenMaxAge: number = 7 * 24 * 60 * 60 * 60 * 1000;
}
