import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({ // Este módulo es el encargado de importar y exportar el servicio de Prisma para que pueda ser utilizado en toda la aplicación.
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
