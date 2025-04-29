import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [ArticlesModule, PrismaModule, CommonModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
