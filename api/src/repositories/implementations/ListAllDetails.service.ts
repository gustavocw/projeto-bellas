import { Injectable } from "@nestjs/common";
import { Escort } from "@prisma/client";
import { PrismaService } from "src/database";
import { AListAll } from "../IListAllDetails.account";

@Injectable()
export class ListDetailsOfEscortImplementation implements AListAll{
    constructor(
        private prisma:PrismaService,
    ){};

    async findAllEscorts(): Promise<Escort[]> {
        const findAllEscortsWithDetails = await this.prisma.escort.findMany({
            include: { 
                dataEscort:true, 
                imagesEscort:true,
            },
        });

        const filter = await findAllEscortsWithDetails.filter(e => e.dataEscort.length > 0);
        return filter;
    };
};
