import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";


@Controller()
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @MessagePattern({ cmd: 'register' })
    async register(@Payload() data: {name: string, email: string, password: string}){
      return await this.userService.createUser(data.name, data.email, data.password);
    };

    @MessagePattern({ cmd: 'login' })
    async login(@Payload() data: {email: string, password: string}): Promise<{access_token: string}> {
      const user = await this.authService.validateUser(data.email, data.password);
      if(!user){
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    };
   
    @MessagePattern({ cmd: 'get_user' })
    async getUser(@Payload() userId: number): Promise<User | null>  {
      return this.userService.findUserById(userId);
    }
}