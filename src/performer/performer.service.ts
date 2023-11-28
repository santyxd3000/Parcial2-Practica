import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.description.length > 100){
            throw new BusinessLogicException("100 characters for description maximum",BusinessError.VALIDATION_FAILED)
        }
        return await this.performerRepository.save(performer);
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id}, relations: ["albums"] } );
        if (!performer)
          throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
   
        return performer;
    }

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({ relations: ["albums"] });
    }


}
