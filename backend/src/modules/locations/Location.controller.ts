import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
    return this.locationService.updateLocation(id, dto);
  }
  @Post('/')
  async createLocation(@Body() dto: LocationDto) {
    return this.locationService.createLocation(dto);
  }
}
