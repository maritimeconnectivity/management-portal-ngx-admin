import { Entity } from './entity';
import { Pageable } from './pageable';
import { Sort } from './sort';

export interface PageEntity { 
    totalPages?: number;
    totalElements?: number;
    sort?: Sort;
    numberOfElements?: number;
    first?: boolean;
    last?: boolean;
    pageable?: Pageable;
    size?: number;
    content?: Array<Entity>;
    number?: number;
    empty?: boolean;
}