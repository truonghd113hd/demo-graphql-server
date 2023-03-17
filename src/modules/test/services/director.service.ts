import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DirectorInput } from 'src/decorators/test.decorator';
import { Director, DirectorDocument } from 'src/schemas/director.schema'
// import { MovieService } from './movie.service';
// import { StudioService } from './studio.service';

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class DirectorService {
    constructor(
        // private movieService: MovieService,
        @InjectModel(Director.name)
        private directorModel: Model<DirectorDocument>,
        // private studioService: StudioService,
    ) { }

    async getDirectors() {
        return await this.directorModel.find()
    }

    async getDirector(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException({ message: 'invalid_id_format' });
        }
        return await this.directorModel.findById(id)
    }

    async addNewDirector(input: DirectorInput) {
        let data = new this.directorModel({
            name: input.name,
            info: input.info,
        })
        return await data.save()
    }
}
