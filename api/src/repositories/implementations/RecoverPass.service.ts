import { PrismaService } from "src/database";
import { ARecoverPass } from "../IRecoverPass.account";
import { IRecoverDTO } from "src/useCases/recoverPass/RecoverPass.DTO";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RecoverPassImplementation implements ARecoverPass {
    constructor(
        private prisma:PrismaService, 
    ){};
    async updatedCode(data: IRecoverDTO): Promise<Object> {
        const updated_pass = await this.prisma.escort.update({
            where:{ email:data.email },

            data:{
                code:data.code,
                codeDate:data.hour,
            },
        });
        return { code:true };
    };
};
