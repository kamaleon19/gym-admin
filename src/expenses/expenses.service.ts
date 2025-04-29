import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CommonService } from 'src/common/common.service';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateExpenseDto, DateFilterDto, UpdateExpenseDto } from './dto';
import { PaymentStatus } from './enum/paymentStatus.enum';

@Injectable()
export class ExpensesService { // TO DO: Ajustar la logica para campos UpdatedAt y PaidAt

  private readonly logger = new Logger('ExpensesService');

  constructor(
    private readonly prisma : PrismaService,
    private readonly commonService : CommonService
  ) {
    this.logger.log('ExpensesService initialized');
  }


  async create(createExpenseDto: CreateExpenseDto) {

    try {
      const expense = await this.prisma.expenses.create({
        data: createExpenseDto,
      })

      return {
        status: 201,
        message: 'Expense created successfully',
        expense,
      };

    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    
    // Desestructuramos los valores de paginación del DTO y asignamos los valores que necesitamos para la paginacion.
    const {page = 1, limit = 10} = paginationDto;
    const totalExpenses = await this.prisma.expenses.count()
    const totalPages = Math.ceil(totalExpenses / limit);

    const expenses = await this.prisma.expenses.findMany({
      take: limit,
      skip: (page - 1) * limit,
    })

    // Retornamos los registros
    return {
      status: 200,
      data: expenses,
      meta: {
        totalExpenses,
        totalPages,
        currentPage: page,
      }
    }
  }

  async findOne(id: number) {

    const expense = await this.prisma.expenses.findUnique({
      where: { id}
    })

    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    return {
      status: 200,
      data: expense,
    }
  }

  async findByDate(dateFilterDto: DateFilterDto) {

    const { startDate, endDate } = dateFilterDto;

    const expenses = await this.prisma.expenses.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        },
      },
    })

    const total = expenses.reduce((totalAmount, expense) =>{
      return totalAmount + parseFloat(expense.import.toString());
    }, 0)

    if(expenses.length === 0) {
      throw new NotFoundException(`No expenses found between ${startDate} and ${endDate}`);
    }

    return {
      status: 200,
      data: expenses,
      total
    }
  }

  async findByPaymentStatus(status: PaymentStatus) {

    const expenses = await this.prisma.expenses.findMany({
      where: {
        status: status
      }
    })

    if (expenses.length === 0) {
      throw new NotFoundException(`No expenses found with status ${status}`);
    }

    return {
      status: 200,
      data: expenses,
    }
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {

    try {
      const expense = await this.prisma.expenses.update({
        where: { id },
        data: updateExpenseDto
      })

      return {
        status: 200,
        message: 'Expense updated successfully',
        data: expense,
      }

    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    
    const expense = await this.prisma.expenses.delete({
      where: { id }
    })

    return {
      status: 200,
      message: 'Expense deleted successfully',
    }
  }
}
