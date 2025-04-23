import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { AuthPayload } from "./auth.payload";
import { CreateUserInput } from "src/dtos/user.input";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('email') email: string, @Args('password') password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @Mutation(() => AuthPayload)
  async signup(@Args('input') input: CreateUserInput) {
    return this.authService.signup(input);
  }
}
