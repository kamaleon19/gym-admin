import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { PrismaService } from 'prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ArticlesService {

  private readonly logger = new Logger('ArticlesService');

  constructor(
    private readonly prisma: PrismaService, // Aqui inyectamos el servicio de Prisma para interactuar con la base de datos.
    private readonly commonService: CommonService, 
  ) {
    this.logger.log('ArticlesService initialized');
  }

  async create(createArticleDto: CreateArticleDto) {

    try {
      const article = await this.prisma.articles.create({
        data: createArticleDto,
      });
  
      return {
        status: 201,
        message: 'Article created successfully',
        article,
      };
      
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }

    

  }

  async findAll(paginationDto: PaginationDto) {

    // Desestructuramos los valores de paginación del DTO y asignamos los valores que necesitamos para la paginacion.
    const { page = 1, limit = 10 } = paginationDto; 
    const totalArticles = await this.prisma.articles.count({ where: { status: true } });
    const totalPages = Math.ceil(totalArticles / limit);

    // Buscamos los registros de acuerdos a los parametros de paginacion.
    const articles = await this.prisma.articles.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { status: true },
    });

    // Retornamos los registros.
    return {
      data: articles,
      meta: {
        totalArticles,
        totalPages,
        currentPage: page,
      }
    };

  }


  async findByTitle(title: string) {

    const articles = await this.prisma.articles.findMany({

      where: {
        name: {
          contains: title,
          mode: 'insensitive',
        }
      }
    })

    return {
      status: 200,
      articles,
    }

  }

  async findOne(id: number) {
    
    const article = await this.prisma.articles.findUnique({ where: { id } });

    if(!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    return {
      status: 200,
      message: 'Article retrieved successfully',
      article,
    };
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {

    try {
      const article = await this.prisma.articles.update({
        where: { id },
        data: updateArticleDto,
      });
  
      return {
        status: 200,
        message: 'Article updated successfully',
        article,
      };
      
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }

  }

  async remove(id: number) {

    try {
      const article = await this.prisma.articles.update({
        where: { id },
        data: { status: false },
      });
  
      return {
        status: 200,
        message: 'Article removed successfully',
      };
      
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }

  
  }
}
