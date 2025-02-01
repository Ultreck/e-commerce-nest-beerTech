import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
