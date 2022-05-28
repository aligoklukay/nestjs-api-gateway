import {Body, Controller, Inject, Post, UseFilters} from '@nestjs/common'

import {AuthService} from './authentication.service'
import {AuthenticationLoginDto} from './dto/authentication-login.dto'
import {AuthenticationRegisterDto} from './dto/authentication-register.dto'
import {Public} from 'src/decorators/is-public.decorator'
import {HttpExceptionFilter} from 'src/filters/http-exception.filter'

@UseFilters(HttpExceptionFilter)
@Public()
@Controller('auth')
export class AuthController {
    @Inject() private readonly authService: AuthService

    @Post('sign-up')
    public async signUp(@Body() body: AuthenticationRegisterDto): Promise<any> {
        return await this.authService.signUp(body)
    }

    @Post('login')
    public async login(@Body() body: AuthenticationLoginDto): Promise<any> {
        return await this.authService.login(body)
    }
}
