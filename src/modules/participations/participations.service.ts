import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Participation } from 'src/db/models/participation.entity';
import { EntityManager } from 'typeorm';
import axiosInstance from '../common/axios.config';
import { seedMovie } from '../common/movie.mockup';
import { RequestCreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(@InjectEntityManager() readonly dbManager: EntityManager) {}
  async create(createParticipationDto: RequestCreateParticipationDto) {
    try {
      const result = await this.dbManager.save(
        Participation,
        createParticipationDto,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all participations`;
  }

  async seed() {
    seedMovie.map(async (el) => {
      const resultAxios = await axiosInstance.get(
        `/movie/${el.id}/credits?api_key=4e084eabfb6c9b9cba5de177ff89cf4f&language=vi-VN`,
      );
      resultAxios.data.cast.map(async (element) => {
        await this.dbManager.save(Participation, {
          actorId: element.id,
          movieId: el.id,
        });
      });
    });
    return `This action returns all participations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }

  update(id: number, updateParticipationDto: UpdateParticipationDto) {
    return `This action updates a #${id} participation`;
  }

  remove(id: number) {
    return `This action removes a #${id} participation`;
  }
}
