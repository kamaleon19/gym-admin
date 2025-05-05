import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ExpensesService } from './expenses.service';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateExpenseDto, DateFilterDto, UpdateExpenseDto } from './dto';
import { PaymentStatus } from './enum/paymentStatus.enum';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.expensesService.findAll(paginationDto);
  }

  @Get('findByDate')
  findByDate(@Query() dateFilterDto: DateFilterDto) {
    return this.expensesService.findByDate(dateFilterDto);
  }

  @Get('paymentStatus')
  findByPaymentStatus(@Query('status') status: PaymentStatus) {
    return this.expensesService.findByPaymentStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
