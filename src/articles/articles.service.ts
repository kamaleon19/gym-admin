import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ArticlesService extends PrismaClient implements OnModuleInit {
  
  constructor() {
    super();
  }

  private readonly logger = new Logger('ArticlesService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  
  async create(createArticleDto: CreateArticleDto) {

    const article = await this.article.create({
      data: createArticleDto,
    })
    return article
  }

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto

    const totalArticles = await this.article.count({ where: { status: true } })
    const totalPages = Math.ceil(totalArticles / limit)

    const data = await this.article.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { status: true },
    })

    return{
      data,
      meta: {
        totalArticles,
        page,
        totalPages,
      }
    }
  }

  async findOne(id: number) {

    const article = await this.article.findUnique({ where: { id } })

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`)
    }
    return article
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    
    const article = await this.article.update({
      where: { id },
      data: updateArticleDto,
    })
    return article
  }

  async remove(id: number) {

    await this.article.update({ where: { id }, data: { status: false }})
    return {
      message: `Article #${id} has been deleted`
    }
  } 
}
