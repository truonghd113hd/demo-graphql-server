import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';


@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService
    ) { }

    @Query(() => String)
    async login() {
        let data = await this.authService.generateNewToken("1")
        return data.access_token
    }
}
