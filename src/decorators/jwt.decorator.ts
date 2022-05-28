import {createParamDecorator, ExecutionContext, UnauthorizedException} from '@nestjs/common'

export const Jwt = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const bearerToken = request.headers.authorization
    const token = bearerToken.split(' ')
    const jwt = token[1]

    if (!jwt) {
        throw new UnauthorizedException()
    }
    return jwt
})
