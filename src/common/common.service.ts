import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {
  
    handleDBExceptions (error: any){

        if(error.code === 'P2002'){ 
          throw new BadRequestException("Database error: Duplicate entry", error.meta.target);
        }
        
        console.log(error);
        throw new InternalServerErrorException('Please check server logs.')
        
    }    
}