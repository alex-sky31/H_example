import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }
  async patchPrice(id: number, prix: number) {
    let userProfile = await this.locationRepository.findOne(id);
    console.log(userProfile);
    userProfile.price = prix;
    return await this.locationRepository.save(userProfile);
  }

  async DeleteLocation(id: number) {
    let userProfile = await this.locationRepository.findOne(id);
    console.log(userProfile);
    return await this.locationRepository.remove(userProfile);
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
