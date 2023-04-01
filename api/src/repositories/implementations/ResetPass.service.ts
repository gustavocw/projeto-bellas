import { IResetPass } from "src/useCases/resetPass/ResetPass.DTO";
import { AResetPass } from "../IResetPass.account";
import { PrismaService } from "src/database";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as brcypt from "bcryptjs";

@Injectable()
export class ResetPassImplementation implements AResetPass {
    constructor(
        private prisma:PrismaService,
    ){};
    async resetPass(data: IResetPass): Promise<Object> {

        if(data.newPass !== data.confirmPass){
            throw new HttpException({erro:true, message:'Senhas não batem!'}, HttpStatus.BAD_REQUEST);
        };

        const salt = await brcypt.genSalt(10);
        const hash = await brcypt.hash(data.confirmPass, salt);
        
        const updatePass = await this.prisma.escort.update({
            where:{ id:data.userId },

            data:{
                password:hash,
            }
        });

        return { newPass:true };
    };
};
