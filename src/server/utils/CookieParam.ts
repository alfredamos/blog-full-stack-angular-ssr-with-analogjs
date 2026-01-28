export class CookieParam {
  static accessTokenName: string = 'accessToken';
  static accessTokenPath: string = '/';
  static accessTokenMaxAge: number = 24 * 60 * 60 * 60 * 1000;

  static refreshTokenName: string = 'refreshToken';
  static refreshTokenPath: string = '/api/auth/refresh';
  static refreshTokenMaxAge: number = 7 * 24 * 60 * 60 * 60 * 1000;
}
