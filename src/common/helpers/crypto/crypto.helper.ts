import { Injectable } from '@nestjs/common';
import { verify, decode } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JWT } from '../../interfaces/authorization.interface';

@Injectable()
export class CryptoHelper {
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = configService.get('JWT.secretKey');
  }

  public decodeFromBase64<T>(b64string: string): T {
    return JSON.parse(Buffer.from(b64string, 'base64').toString('ascii')) as T;
  }

  public verifyJWT<T extends unknown>(token: string): T {
    return verify(token, this.secretKey) as T;
  }
}
