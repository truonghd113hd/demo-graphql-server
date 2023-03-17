import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { config } from './config/database/mongo/configuration'
import { TestModule } from './modules/test/test.module';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config().url, config().options),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: any) => {
            const { connectionParams, extra } = context;
            // user validation will remain the same as in the example above
            // when using with graphql-ws, additional context value should be stored in the extra field
            extra.user = { user: {} };
          },
        },
        'subscriptions-transport-ws': true,
      },
      context: ({ extra }) => {
        // you can now access your additional context value through the extra field
      },
      // subscriptions: {
      //   'subscriptions-transport-ws': {
      //     onConnect: (connectionParams) => {

      //     },
      //   }
      // },
      // context: ({ connection }) => {
      //   // connection.context will be equal to what was returned by the "onConnect" callback
      // },
    }),
    TestModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
