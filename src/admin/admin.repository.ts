import { EntityRepository, Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';

@EntityRepository(AdminEntity)
export class IdeaRepository extends Repository<AdminEntity> {}
