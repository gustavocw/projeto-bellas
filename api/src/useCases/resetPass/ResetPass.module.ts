import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ResetPassController } from "./ResetPass.controller";
import { PrismaService } from "src/database";
import { ResetPassImplementation } from "src/repositories/implementations/ResetPass.service";
import { ResetPassService } from "./ResetPass.service";
import { token_middleware } from "src/middlewares/jwt.middleware";
import { isEscort } from "src/middlewares/isEscort.middleware";

@Module({
    imports: [],
    controllers: [ResetPassController],
    providers: [
        PrismaService,
        ResetPassImplementation,
        ResetPassService,
        token_middleware,
        isEscort
    ]
})
export class ResetPassModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer 
        .apply(token_middleware)
        .forRoutes('newPass/escort')
    };
  };
