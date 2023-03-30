import { Body, Controller, Post, Request } from "@nestjs/common";
import { IDescriptionEscortDTO } from "./DescriptionEscort.DTO";
import { CreateDescriptionService } from "./DescriptionEscort.service";
import { CustomRequest } from '../../interfaces/Request.interface';

@Controller('description')
export class DescriptionController {
    constructor(
        private descriptionService:CreateDescriptionService,
        ){};

    @Post('create')
    async handle_createDescription(@Body() body:IDescriptionEscortDTO, @Request() req:CustomRequest){
        try {
            const savedDescriptionEscort = await this.descriptionService.createDescriptionEscort(
                {
                    userId:req.userId, 
                    age:body.age,
                    contact:body.contact,
                    description:body.description,
                    dummy:body.dummy,
                    eyes:body.eyes,
                    feet:body.feet,
                    hip:body.hip,
                    price:body.price,
                    type:body.type,
                    waist:body.waist,
                    weight:body.weight,
                });
            return { description:true };
        } catch (error) {
            return error;
        };
    };
};
