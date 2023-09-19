import { NotFoundException } from '@nestjs/common';

export class Services {
    message(text:string) {
        return { message: text};
    }

    validateEntity(entity: any, entityName: string,  id?:number,) {
      if (!entity) {
        throw new NotFoundException(`${entityName} with ID ${id} not found`);
      };
    
      if (entity.Length === 0) {
        throw new NotFoundException(`${entityName} entities not found`);
      };
    }
}