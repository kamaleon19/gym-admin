import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Users } from "@prisma/client";

import { ExtractJwt, Strategy } from "passport-jwt";


import { PrismaService } from "prisma/prisma.service";
import { JwtPayload } from "../interfaces";


@Injectable()
export class JwtStrategy extends PassportStrategy ( Strategy ) {

    constructor(
        
        private readonly prisma : PrismaService,

        configService : ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET', 'defaultSecret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    async validate( payload : JwtPayload): Promise<Users> {

        const { id } = payload

        const user = await this.prisma.users.findUnique({
            where: {
                id
            }
        })
        
        if(!user){
            throw new UnauthorizedException('Token is not valid.')
        }
        return user


    }
}