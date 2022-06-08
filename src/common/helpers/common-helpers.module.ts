import { Global, Module } from '@nestjs/common';
import { CryptoHelper } from './crypto/crypto.helper';
import { HttpHelper } from './http/http.helper';

@Global()
@Module({
  providers: [HttpHelper, CryptoHelper],
  exports: [CryptoHelper, HttpHelper],
})
export class CommonHelpersModule {}
