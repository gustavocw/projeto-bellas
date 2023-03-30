import { IsNotEmpty } from "class-validator";

export class IDescriptionEscortDTO {
  @IsNotEmpty()
  price:string;
  
  @IsNotEmpty()    
  description:string;
  
  @IsNotEmpty()
  contact:string;

  @IsNotEmpty()
  type:string;

  @IsNotEmpty()
  eyes:string;

  @IsNotEmpty()
  waist:string;

  @IsNotEmpty()
  dummy:number;

  @IsNotEmpty()
  feet:number;

  @IsNotEmpty()
  weight:string;

  @IsNotEmpty()    
  hip:string;    
  
  @IsNotEmpty()
  age:number;

  @IsNotEmpty()
  userId:string;
};
