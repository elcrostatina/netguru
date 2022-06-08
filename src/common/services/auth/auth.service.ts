import {
  ExecutionContext,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../../interfaces/authorization.interface';
import { Headers } from '../../enums/headers.enum';
import { Reflector } from '@nestjs/core';
import { CryptoHelper } from '../../helpers/crypto/crypto.helper';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private sessionToken: JwtPayload;

  constructor(
    private readonly cryptoHelper: CryptoHelper,
    private readonly reflector: Reflector,
  ) {}

  public parseAndSetJWT(context: ExecutionContext): JwtPayload {
    this.sessionToken = this.parseJwt(
      context.switchToHttp().getRequest<Request>(),
    );
    return this.sessionToken;
  }

  public parseJwt(request: Request): JwtPayload {
    try {
      const jwt = request.headers[Headers.Authorization].slice(7);
      return this.cryptoHelper.verifyJWT<JwtPayload>(jwt);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  public getSessionToken(): JwtPayload {
    return this.sessionToken;
  }
}
