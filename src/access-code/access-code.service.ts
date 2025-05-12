import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { randomInt } from 'crypto';

@Injectable()
export class AccessCodeService {

    constructor(
        private readonly prisma : PrismaService
    ) {}

    async generateAccessCode() {
        
        let exists : boolean = true
        do {
            // Generamos un código aleatorio de 4 dígitos
            const code = randomInt(0, 9999).toString().padStart(4, '0');
            // Verificamos si el código ya existe en la base de datos
            const partner = await this.prisma.partners.findUnique({
                where: {
                    code
                }
            })
            if(!partner) {
                exists = false
                return code
            }
            else{
                exists = true
            }
        }while(exists)
             

    }

}
