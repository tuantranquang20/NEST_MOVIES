import { PartialType } from '@nestjs/mapped-types';
import { RequestCreatePostDto } from './requests/create-post.dto';

export class UpdatePostDto extends PartialType(RequestCreatePostDto) {}
