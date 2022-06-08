import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CryptoHelper } from '../helpers/crypto/crypto.helper';
import { RefreshToken } from '../interfaces/authorization.interface';

@Injectable()
export class RefreshTokenPipe implements PipeTransform {
  constructor(private cryptoHelper: CryptoHelper) {}

  public async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('Validation failed');
    return this.cryptoHelper.decodeFromBase64<RefreshToken>(value.refreshToken);
  }
}
