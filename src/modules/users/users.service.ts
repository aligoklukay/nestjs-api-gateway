import {HttpException, Inject, Injectable} from '@nestjs/common'
import {ClientProxy} from '@nestjs/microservices'
import {catchError} from 'rxjs'

@Injectable()
export class UsersService {
    @Inject('users') private readonly client: ClientProxy

    public async findMe(id): Promise<any> {
        return this.client.send({cmd: 'findme'}, id).pipe(
            catchError(val => {
                throw new HttpException(val.message, 500)
            }),
        )
    }
}
