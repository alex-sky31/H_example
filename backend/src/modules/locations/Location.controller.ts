import { Controller, Get, Param, ParseIntPipe, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { LocationService } from './Location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  @Post('Delete/:id')
  async DeleteLocationId(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response){
    console.log(id)
    await this.locationService.DeleteLocation(id)
    res.send(200)
  }

  @Post('Update/')
  async UpdatePriceId( @Req() req: Request, @Res() res: Response){
    console.log(req.body)
   await this.locationService.patchPrice(req.body.id, req.body.price)
   res.send(200)
  }
  @Post('Add/')
  async AddLocation(@Req() req: Request, @Res() res: Response){
  console.log(req.body)
  await this.locationService.CreateLocation(req.body)
   res.send(200)
  }
}
