import { IsNotEmpty } from "class-validator";

export class IResetPass {
    @IsNotEmpty()
    newPass:string;

    @IsNotEmpty()
    confirmPass:string;

    userId:string;
};
