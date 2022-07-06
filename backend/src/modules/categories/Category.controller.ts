import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './Category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /** List all categories in database with this endpoint */
  @Get()
  async getCategorys() {
    return await this.categoryService.getCategorys();
  }
}
