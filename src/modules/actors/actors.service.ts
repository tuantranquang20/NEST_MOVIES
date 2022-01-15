import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Actor } from 'src/db/models/actor.entity';
import { Brackets, EntityManager } from 'typeorm';
import { seedMovie } from '../common/movie.mockup';
import { RequestCreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import axios from 'axios';
import axiosInstance from '../common/axios.config';
@Injectable()
export class ActorsService {
  constructor(
    @InjectEntityManager()
    private readonly dbManager: EntityManager,
  ) {}

  async create(createActorDto: RequestCreateActorDto) {
    try {
      const result = await this.dbManager.save(Actor, createActorDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async seed() {
    try {
      // actor.map(async (el) => {
      //   await this.dbManager.save(Actor, el);
      // });
      seedMovie.map(async (el) => {
        const resultAxios = await axiosInstance.get(
          `/movie/${el.id}/credits?api_key=4e084eabfb6c9b9cba5de177ff89cf4f&language=vi-VN`,
        );
        resultAxios.data.cast.map(async (element) => {
          await this.dbManager.save(Actor, {
            id: element.id,
            name: element.name,
            gender: element.gender,
            avatar: element.profile_path
              ? `https://image.tmdb.org/t/p/original${element.profile_path}`
              : element.profile_path,
          });
        });
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `this is finall action`;
  }

  async findOne(id: number) {
    try {
      const queryBuilderGetMovie = await this.dbManager
        .createQueryBuilder(Actor, 'actor')
        .where((queryBuilder) => {
          if (id) {
            queryBuilder.andWhere(
              new Brackets((qb) => {
                qb.where('actor.id = :id', {
                  id: id,
                });
              }),
            );
          }
        })
        .getRawOne();
      // TODO return images

      return queryBuilderGetMovie;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
