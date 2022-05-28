import {Controller, Get, Inject, UseFilters} from '@nestjs/common'
import {CurrentUser} from 'src/decorators/current-user.decorator'

import {HttpExceptionFilter} from 'src/filters/http-exception.filter'
import {UsersService} from './users.service'

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
    @Inject() private readonly service: UsersService

    @Get('/me')
    public async signUp(@CurrentUser() user): Promise<any> {
        return await this.service.findMe(user.id)
    }
}
