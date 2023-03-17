import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudioInput } from 'src/decorators/test.decorator';
import { Studio, StudioDocument } from 'src/schemas/studio.schema';
// import { DirectorService } from './director.service';
// import { MovieService } from './movie.service';

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class StudioService {
    constructor(
        // private movieService: MovieService,
        @InjectModel(Studio.name)
        private studioModel: Model<StudioDocument>,
        // private directorService: DirectorService,
    ) { }

    async getStudios() {
        return await this.studioModel.find()
    }

    async getStudio(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException({ message: 'invalid_id_format' });
        }
        return await this.studioModel.findById(id)
    }

    async addNewStudio(input: StudioInput) {
        let data = new this.studioModel({
            name: input.name,
            info: input.info,
        })
        return await data.save()
    }
}
