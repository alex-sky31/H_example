import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocationService } from './Location.service';
import { LocationDto } from './Location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get('/all')
  async getLocations() {
    return this.locationService.getLocations();
  }
  @Get('/:id')
  async getLocationById(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.getLocationById(id);
  }

  @Delete('/:id')
  async deleteLocationId(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }

  @Patch('/:id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LocationDto,
  ) {
    console.log(id);
    console.log(dto);
    return this.locationService.updateLocation(id, dto);
  }
  @Post('Add/')
  async AddLocation(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    await this.locationService.CreateLocation(req.body);
    res.send(200);
  }
}
