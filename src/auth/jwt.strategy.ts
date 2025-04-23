import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySecret123!',
    });
    
  }

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub);  
    if (!user) {
      throw new Error('User not found');
    }
    return user;  
  }
}
