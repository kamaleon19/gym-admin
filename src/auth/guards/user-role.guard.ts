import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role.protected.decorator';



@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector : Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles = this.reflector.get( META_ROLES, context.getHandler() )
    if(!validRoles) return true
    if( validRoles.length === 0) return true
    const req = context.switchToHttp().getRequest()
    const user = req.user as Users

    if(!user){
      throw new BadRequestException('User not found.')
    }

    for (const role of user.rol){
      if(validRoles.includes( role )){
        return true
      }
    }

    throw new ForbiddenException(`User ${user.username} needs a valid role : [${validRoles}]`)


    
  }
}
