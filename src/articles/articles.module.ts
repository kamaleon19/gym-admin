import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [

    AuthModule
  ]
})
export class ArticlesModule {}
