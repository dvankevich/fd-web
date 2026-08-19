import type { Nullable, Tokens } from '@shared/types';
import { refreshTokens } from './api';
import { AUTH_PERSIST } from './constants';

type ReadRefreshToken = () => Nullable<string>;

interface SessionRefresherOptions {
  rotate: (refreshToken: string) => Promise<Tokens>;
}

interface RotatedToken {
  refreshToken: string;
  tokens: Tokens;
}

const withSessionLock = <T>(run: () => Promise<T>): Promise<T> =>
  navigator.locks ? navigator.locks.request(AUTH_PERSIST.lockName, run) : run();

export class SessionRefresher {
  private readonly rotate: (refreshToken: string) => Promise<Tokens>;
  private pending: Nullable<Promise<Nullable<Tokens>>> = null;
  private rotated: Nullable<RotatedToken> = null;

  constructor({ rotate }: SessionRefresherOptions) {
    this.rotate = rotate;
  }

  run(readRefreshToken: ReadRefreshToken): Promise<Nullable<Tokens>> {
    if (!this.pending) {
      this.pending = this.rotateOnce(readRefreshToken).finally(() => {
        this.pending = null;
      });
    }
    return this.pending;
  }

  forget(): void {
    this.rotated = null;
  }

  private rotateOnce(readRefreshToken: ReadRefreshToken): Promise<Nullable<Tokens>> {
    return withSessionLock(async () => {
      const refreshToken = readRefreshToken();
      if (!refreshToken) {
        return null;
      }
      if (this.rotated?.refreshToken === refreshToken) {
        return this.rotated.tokens;
      }
      const tokens = await this.rotate(refreshToken);
      this.rotated = { refreshToken, tokens };
      return tokens;
    });
  }
}

export const sessionRefresher = new SessionRefresher({ rotate: refreshTokens });
