import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginWithEmailDto } from './dto/loginWithEmail.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-with-email')
  @ApiOkResponse({type: AuthEntity})
  loginWithEmail(@Body() {email, password}: LoginWithEmailDto) {
    return this.authService.loginWithEmail(email, password);
  }

  @Post('login-with-username')
  @ApiOkResponse({type: AuthEntity})
  loginWithUsername(@Body() {username, password}: LoginDto) {
    return this.authService.loginWithUsername(username, password);
  }
}
