import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieInput } from 'src/decorators/test.decorator';
import { Movie, MovieDocument } from 'src/schemas/movie.schema';
import { StudioService } from './studio.service';
import { DirectorService } from './director.service';

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class MovieService {
    constructor(
        private studioService: StudioService,
        @InjectModel(Movie.name)
        private movieModel: Model<MovieDocument>,
        private directorService: DirectorService,
    ) { }

    async getMovies(director_id: string, studios_id: string) {
        return await this.movieModel.find().populate('director').populate('studios')
    }

    async getMovie(id: string) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException({ message: 'invalid_id_format' });
        }
        return await this.movieModel.findById(id).populate('director').populate('studios')
    }

    async addNewMovie(input: MovieInput) {
        let director = await this.directorService.getDirector(input.director)
        let studio = await this.studioService.getStudio(input.studios)
        if (!director || !studio) throw new BadRequestException({ message: "invalid_data" })
        let data = new this.movieModel({
            name: input.name,
            description: input.description,
            duration: input.duration,
            director: director._id,
            studios: studio._id
        })
        await data.save()
        return await this.movieModel.findById(data._id).populate('director').populate('studios')
    }

    async updateMovie(input: MovieInput, id: string) {
        let movie = await this.getMovie(id);
        let director = await this.directorService.getDirector(input.director)
        let studio = await this.studioService.getStudio(input.studios)
        if (!movie) throw new BadRequestException({ message: "movie_not_found" })
        if (!director || !studio) throw new BadRequestException({ message: "invalid_data" })
        let data = {
            name: input.name,
            description: input.description,
            duration: input.duration,
            director: input.director,
            studios: input.studios
        }
        await this.movieModel.findByIdAndUpdate(id, data)
        return await this.movieModel.findById(id).populate('director').populate('studios')
    }

    async deleteMovie(id: string) {
        let movie = await this.getMovie(id);
        if (movie) {
            await this.movieModel.findByIdAndDelete(id)
        }
    }
}
