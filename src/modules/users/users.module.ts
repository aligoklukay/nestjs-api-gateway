import {Module} from '@nestjs/common'
import {ClientsModule, Transport} from '@nestjs/microservices'

import {UsersController} from './users.controller'
import {UsersService} from './users.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'users',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 3002,
                },
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
