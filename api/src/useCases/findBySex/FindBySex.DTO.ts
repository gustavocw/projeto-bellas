import { IsNotEmpty } from "class-validator";

export class IBySexDTO {
    @IsNotEmpty()
    sexo:string;

    @IsNotEmpty()
    city:string;
};
