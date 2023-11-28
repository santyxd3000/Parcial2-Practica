import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}


    async create(album: AlbumEntity): Promise<AlbumEntity> {
        // Validar que el nombre y la descripción no estén vacíos
        if (!album.name || !album.description) {
            throw new BusinessLogicException("The name and description of the album cannot be empty", BusinessError.VALIDATION_FAILED);
        }
    
        return await this.albumRepository.save(album);
    }

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["tracks","performers"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["tracks", "performers"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
   
        return album;
    }

    
    async delete(id: string) {
        // Buscar el álbum por ID con sus tracks asociados
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ["tracks"] });
        if (!album) {
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        // Validar que el álbum no tenga tracks asociados
        if (album.tracks && album.tracks.length > 0) {
            throw new BusinessLogicException("Cannot delete an album with associated tracks", BusinessError.VALIDATION_FAILED);
        }
    
        // Eliminar el álbum de la base de datos
        await this.albumRepository.remove(album);
    }


}
