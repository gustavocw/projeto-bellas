import { ResetPassImplementation } from "src/repositories/implementations/ResetPass.service";
import { IResetPass } from "./ResetPass.DTO";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ResetPassService {
    constructor(
        private resetPassImplementation:ResetPassImplementation,
    ){};
    async handle_resetPass(data:IResetPass){
        const save_newPass = await this.resetPassImplementation.resetPass(data);
        return save_newPass;
    };
};
