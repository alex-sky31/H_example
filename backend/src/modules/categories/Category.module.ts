import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './Category.controller';
import { Category } from './Category.entity';
import { CategoryService } from './Category.service';

@Module({
  /** TypeOrmModule.forFeature([Category]) enables the Category module to inject Typeorm Repositories for the Category entity */
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  /** Exporting this service lets you declare CategoryService in the services of Modules where you would import the CategoryModule
   * i.e. all you have to do to use the CategoryService in other services is:
   * - declare `private readonly locationService: CategoryService` in the constructor of the service where you want to use it
   * - import the CategoryModule in the corresponding module where you will need it
   */
  exports: [CategoryService],
})
export class CategoryModule {}
