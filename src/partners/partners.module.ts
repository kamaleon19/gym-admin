import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { CommonModule } from 'src/common/common.module';
import { AccessCodeModule } from 'src/access-code/access-code.module';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService],
  imports: [CommonModule, AccessCodeModule]
})
export class PartnersModule {}
