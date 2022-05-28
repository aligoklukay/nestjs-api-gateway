import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'

import {ConfigModule} from './config/config.module'
import {AuthModule} from './modules/authentication/authentication.module'
import {JwtAuthGuard} from './modules/authentication/guards/jwt.guard'
import { UsersModule } from './modules/users/users.module'

@Module({
    imports: [ConfigModule, AuthModule, UsersModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
