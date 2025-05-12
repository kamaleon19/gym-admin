import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ExpensesModule } from './expenses/expenses.module';
import { PartnersModule } from './partners/partners.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AccessCodeModule } from './access-code/access-code.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ArticlesModule,
    PrismaModule,
    CommonModule,
    ExpensesModule,
    AuthModule,
    PartnersModule,
    AccessCodeModule,
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
