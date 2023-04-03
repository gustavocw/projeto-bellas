import { Module } from "@nestjs/common";
import { PrismaService } from "src/database";
import { ListDetailsOfEscortImplementation } from "src/repositories/implementations/ListAllDetails.service";
import { EscortListController } from "./ListAllDetails.controller";
import { ListAllDetailsOfEscortService } from "./ListAllDetails.service";
import { RedisProvider } from "src/providers/Implementations/Redis.implementation";

@Module({
    imports: [],
    controllers: [EscortListController],
    providers: [
        PrismaService,
        ListAllDetailsOfEscortService,
        ListDetailsOfEscortImplementation,
        RedisProvider
    ],
})
export class ListAllEscortModule {};
