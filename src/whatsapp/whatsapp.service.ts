import { Injectable } from '@nestjs/common';
import { Partners } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsappService {

    private client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    constructor() {}

    async sendWhatsapp(partner: Partners) {
        await this.client.messages.create({
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${partner.phone}`,
            body: `Hola ${partner.name}!. Bienvenido a tu gimnasio, tu codigo de acceso es: ${partner.code}.`,
        })
    }
}
