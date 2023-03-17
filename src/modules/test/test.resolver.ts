import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MovieInput, StudioInput, DirectorInput } from 'src/decorators/test.decorator';
import { Studios } from 'src/models/studios.model';
import { PubSub } from 'graphql-subscriptions'
import { Movie } from 'src/models/movie.model';
import { DirectorService } from './services/director.service';
import { StudioService } from './services/studio.service';
import { MovieService } from './services/movie.service';
import { Director } from 'src/models/director.model';
import  {UseGuards} from '@nestjs/common' 
import { GqlAuthGuard } from 'src/authentication/guard/jwt-auth.guard';

const pubSub = new PubSub();

@Resolver()
export class TestResolver {
    constructor(
        private readonly directorService: DirectorService,
        private readonly studioService: StudioService,
        private readonly movieService: MovieService
    ) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }

    @Query(() => [Movie])
    async getMovies(@Args('director_id', { nullable: true }) director_id: string, @Args('studios_id', { nullable: true }) studios_id: string) {
        return await this.movieService.getMovies(director_id, studios_id)
    }

    @Query(() => Movie)
    async getMovie(@Args('id') id: string) {
        return await this.movieService.getMovie(id)
    }

    @Query(() => [Director])
    async getDirectors() {
        return await this.directorService.getDirectors()
    }

    @Query(() => Director)
    async getDirector(@Args('id') id: string) {
        return await this.directorService.getDirector(id)
    }

    @Query(() => [Studios])
    async getStudios() {
        return await this.studioService.getStudios()
    }

    @Query(() => Studios)
    async getStudio(@Args('id') id: string) {
        return await this.studioService.getStudio(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Movie)
    async newMovie(
        @Args('input') input: MovieInput
    ) {
        let data = await this.movieService.addNewMovie(input)
        // pubSub.publish('dataAdded', { dataAdded: data });
        return data
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Movie)
    async updateMovie(
        @Args('input') input: MovieInput,
        @Args('id') id: string
    ) {
        let data = await this.movieService.updateMovie(input, id)
        // pubSub.publish('dataAdded', { dataAdded: data });
        return data
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async deleteMovie(
        @Args('id') id: string
    ) {
        await this.movieService.deleteMovie(id)
        // pubSub.publish('dataAdded', { dataAdded: data });
        return id
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Director)
    async newDirector(
        @Args('input') input: DirectorInput
    ) {
        let data = await this.directorService.addNewDirector(input)
        // pubSub.publish('dataAdded', { dataAdded: data });
        return data
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Studios)
    async newStudio(
        @Args('input') input: StudioInput
    ) {
        let data = await this.studioService.addNewStudio(input)
        // pubSub.publish('dataAdded', { dataAdded: data });
        return data
    }

    // @Subscription(() => Recive)
    // dataAdded() {
    //     return pubSub.asyncIterator('dataAdded');
    // }
}
