import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserInput } from "src/dtos/user.input";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcryptjs'; // Use bcryptjs for hashing and comparison

// src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService, // assumes you already have this
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(createUserDto: CreateUserInput) {
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashed,
    });
    return this.login(user); // Auto-login after signup
  }
}
