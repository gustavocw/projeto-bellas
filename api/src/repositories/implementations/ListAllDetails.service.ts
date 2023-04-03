import { Injectable } from "@nestjs/common";
import { Escort } from "@prisma/client";
import { PrismaService } from "src/database";
import { AListAll } from "../IListAllDetails.account";
import { RedisProvider } from "src/providers/Implementations/Redis.implementation";

@Injectable()
export class ListDetailsOfEscortImplementation implements AListAll{
    constructor(
        private prisma:PrismaService,
        private redis:RedisProvider
    ){};

    async findAllEscorts(): Promise<Object[]> {
        const findAllEscortsWithDetails = await this.prisma.escort.findMany({
            include: { 
                dataEscort:true, 
                imagesEscort:true,
            },
        });
        const findAllWithRedis = await this.redis.findIsCacheAndResponse(findAllEscortsWithDetails);
        return findAllWithRedis;
    };
};
