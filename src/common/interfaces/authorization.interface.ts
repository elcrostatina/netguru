import { UserRole } from '../../modules/movies/enums/user-role.enum';

export interface RefreshToken {
  sessionId: string;
  secretToken: string;
  userId: string;
}

export interface JwtPayload {
  userId: number;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';
``;

export interface JWT {
  header: {
    alg: Algorithm;
    typ: string;
    kid: string;
  };
  payload: JwtPayload;
}
