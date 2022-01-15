import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Actor } from 'src/db/models/actor.entity';
import { Brackets, EntityManager } from 'typeorm';
import { RequestCreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import axios from 'axios';
import axiosInstance from '../common/axios.config';

const API_KEY = process.env.API_KEY;
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

  findAll() {
    return `this is finall action`;
  }

  async findOne(id: number) {
    try {
      const result = await axiosInstance.get(
        `/person/${id}?api_key=${API_KEY}`,
      );
      return result;
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
