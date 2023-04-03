import { IResetPass } from "src/useCases/resetPass/ResetPass.DTO";

export abstract class AResetPass{
    abstract resetPass(data:IResetPass): Promise<Object>;
};
