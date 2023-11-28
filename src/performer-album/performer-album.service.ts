import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException,BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class PerformerAlbumService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>,
    
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) {}

    async addPerformerAlbum(performerId: string, albumId: string): Promise<AlbumEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id: performerId}});
        if (!performer)
          throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
      
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["performers", "tracks"]})
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (album.performers.length > 3){
            throw new BusinessLogicException("The album can not have more than 3 performers ", BusinessError.VALIDATION_FAILED);
        }
    
        album.performers = [...album.performers, performer];
        return await this.albumRepository.save(album);
      }

}
