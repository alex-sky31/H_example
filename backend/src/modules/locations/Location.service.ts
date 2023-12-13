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
  async createLocation(dto: LocationDto) {
    const list = this.locationRepository.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      picture: dto.picture,
      stars: dto.stars,
      numberOfRooms: dto.numberOfRooms,
      price: dto.price,
      categoryId: dto.categoryId,
    });
    return await this.locationRepository.save(list);
  }
}
