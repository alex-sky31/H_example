import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './Location.entity';
import { LocationDto } from './Location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }
  async getLocationById(id: number) {
    return await this.locationRepository.findOne(id);
  }
  async updateLocation(id: number, dto: LocationDto) {
    return await this.locationRepository.save(dto);
  }

  async deleteLocation(id: number) {
    return await this.locationRepository.delete(id);
  }
  async CreateLocation(data: any) {
    console.log(data);
    const list = this.locationRepository.create({
      title: data.title,
      description: data.description,
      location: data.location,
      picture: data.picture,
      stars: data.stars,
      numberOfRooms: data.numberOfRooms,
      price: data.price,
      categoryId: data.categoryId,
    });
    return await this.locationRepository.save(list);
  }
}
