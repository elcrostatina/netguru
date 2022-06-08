import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guard to use only for the rest requests.
 *
 * @example
 * @decorator @UseGuards(RestAuthenticationGuard)
 * @decorator @Controller("yourController")
 * export class YourController {...}
 */
@Injectable({ scope: Scope.REQUEST })
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return !!this.authService.parseAndSetJWT(context);
  }
}
