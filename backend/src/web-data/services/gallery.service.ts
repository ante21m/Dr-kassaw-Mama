import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto, UpdateGalleryDto } from '../dtos/gallery.dto';
import { seedGallery } from '../gallery-seed-data';

@Injectable()
export class GalleryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  findAll(): Promise<Gallery[]> {
    return this.galleryRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Gallery> {
    const gallery = await this.galleryRepository.findOne({ where: { id } });
    if (!gallery) throw new NotFoundException('Gallery item not found');
    return gallery;
  }

  create(dto: CreateGalleryDto): Promise<Gallery> {
    const gallery = this.galleryRepository.create(dto);
    return this.galleryRepository.save(gallery);
  }

  async update(id: number, dto: UpdateGalleryDto): Promise<Gallery> {
    const gallery = await this.findOne(id);
    Object.assign(gallery, dto);
    return this.galleryRepository.save(gallery);
  }

  async remove(id: number): Promise<void> {
    const gallery = await this.findOne(id);
    await this.galleryRepository.remove(gallery);
  }

  async seed(): Promise<Gallery[]> {
    const count = await this.galleryRepository.count();
    if (count > 0) return this.galleryRepository.find({ order: { order: 'ASC' } });
    const items = this.galleryRepository.create(seedGallery);
    return this.galleryRepository.save(items);
  }
}
