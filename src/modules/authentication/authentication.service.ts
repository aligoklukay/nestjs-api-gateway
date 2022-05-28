import {HttpException, Inject, Injectable} from '@nestjs/common'
import {ClientProxy} from '@nestjs/microservices'
import {catchError} from 'rxjs'

import {AuthenticationLoginDto} from './dto/authentication-login.dto'
import {AuthenticationRegisterDto} from './dto/authentication-register.dto'

@Injectable()
export class AuthService {
    @Inject('authentication') private readonly client: ClientProxy

    public async signUp(body: AuthenticationRegisterDto): Promise<any> {
        return this.client.send({cmd: 'signup'}, body).pipe(
            catchError(val => {
                throw new HttpException(val.message, 500)
            }),
        )
    }

    public async login(body: AuthenticationLoginDto): Promise<any> {
        return this.client.send({cmd: 'login'}, body).pipe(
            catchError(val => {
                throw new HttpException(val.message, 500)
            }),
        )
    }
}
