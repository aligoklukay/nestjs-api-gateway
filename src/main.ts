import {NestFactory} from '@nestjs/core'

import {AppModule} from './app.module'
import {ConfigService} from './config/config.service'
import {applyGlobalPipes} from './man.global-setup'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = app.get(ConfigService)
    applyGlobalPipes(app)

    app.enableCors({
        origin: config.app.cors.origin,
    })

    await app.listen(config.app.port)
}
bootstrap()
