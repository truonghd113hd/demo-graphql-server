import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from 'src/schemas/studio.schema';
import { Movie, MovieSchema } from 'src/schemas/movie.schema';
import { TestResolver } from './test.resolver';
import { Director, DirectorSchema } from 'src/schemas/director.schema';
import { StudioService } from './services/studio.service';
import { DirectorService } from './services/director.service';
import { MovieService } from './services/movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Studio.name, schema: StudioSchema }]),
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }]),
  ],
  providers: [TestResolver, StudioService, DirectorService, MovieService],
  exports: [StudioService, MovieService, DirectorService]
})
export class TestModule {}
