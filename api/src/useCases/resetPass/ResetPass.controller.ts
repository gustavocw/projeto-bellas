import { Body, Controller, Post, Request } from "@nestjs/common";
import { ResetPassService } from "./ResetPass.service";
import { IResetPass } from "./ResetPass.DTO";
import { CustomRequest } from "src/interfaces/Request.interface";

@Controller('newPass')
export class ResetPassController {
    constructor(
        private resetPassService:ResetPassService,
    ){};

    @Post('escort')
    async handle_newPass(@Body() body:IResetPass, @Request() req:CustomRequest){
            const newPass_saved = await this.resetPassService.handle_resetPass({
                userId:req.userId,
                ...body
            });
            return newPass_saved;
    };
};
