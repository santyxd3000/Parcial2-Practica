import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track..entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException,BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class TrackService {

    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>
    ){}


    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({where: {id}, relations: ["albums"] } );
        if (!track)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
        return track;
    }

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ["albums"] });
    }

    async create(albumId: string, track: TrackEntity): Promise<TrackEntity> {
        if (track.duration <= 0){
            throw new BusinessLogicException("Duration must be positive",BusinessError.PRECONDITION_FAILED);
        }
        if (track.album.id != albumId){
            throw new BusinessLogicException("Album not found",BusinessError.NOT_FOUND)
        }
        return await this.trackRepository.save(track);
    }
}
