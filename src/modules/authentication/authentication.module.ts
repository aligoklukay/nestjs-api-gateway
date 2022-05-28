import {Module} from '@nestjs/common'
import {ClientsModule, Transport} from '@nestjs/microservices'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'

import {AuthController} from './authentication.controller'
import {AuthService} from './authentication.service'
import {JwtStrategy} from './strategies/jwt.strategy'
import {ConfigService} from 'src/config/config.service'
import {ConfigModule} from 'src/config/config.module'

@Module({
    imports: [
        ConfigModule,
        ClientsModule.register([
            {
                name: 'authentication',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 3001,
                },
            },
        ]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.auth.secret,
                }
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
