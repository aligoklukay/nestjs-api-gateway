import {ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {AuthGuard} from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super({defaultStrategy: 'jwt', property: 'currentUser'})
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        // Adds bearerToken to be easily accessible in the request
        const bearerToken = request.headers.authorization

        if (!bearerToken) {
            throw new HttpException('Please provide a valid bearer token.', HttpStatus.UNAUTHORIZED)
        }

        const token = bearerToken.split(' ')

        request.currentBearerToken = token[1]
        if (!request.currentBearerToken) {
            throw new HttpException('Please provide a valid bearer token.', HttpStatus.UNAUTHORIZED)
        }

        // Calling the super function from passport
        // This sets request.currentUser with the payload returned from our JWT Strategy
        const parentCanActivate = (await super.canActivate(context)) as boolean // this is neccssary due to possibly returning `boolean | Promise<boolean> | Observable<boolean>

        return parentCanActivate
    }
}
