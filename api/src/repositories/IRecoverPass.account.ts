import { IRecoverDTO } from '../useCases/recoverPass/RecoverPass.DTO';

export abstract class ARecoverPass {
    abstract updatedCode(data:IRecoverDTO): Promise<Object>;
};
