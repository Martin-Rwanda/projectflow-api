import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { validationSchema } from './config/env.validation';
import { IamModule } from './modules/iam/iam.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { OrganizationOrmEntity } from './modules/organizations/infrastructure/persistence/typeorm/organization.orm-entity';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { SprintsModule } from './modules/sprints/sprints.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TimeTrackingModule } from './modules/time-tracking/time-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: { abortEarly: false },
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({ context: 'HTTP' }),
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
        autoLogging: true,
        redact: ['req.headers.authorization'],
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: false,
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([OrganizationOrmEntity]),
    IamModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    SprintsModule,
    CommentsModule,
    TimeTrackingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes(
      { path: 'organizations/:orgSlug', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/invitations', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/invitations/:token/accept', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/projects', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/projects/:projectId', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/tasks', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/tasks/:taskId', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/sprints', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/sprints/:sprintId', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/sprints/:sprintId/tasks', method: RequestMethod.ALL },
      {
        path: 'organizations/:orgSlug/sprints/:sprintId/tasks/:taskId',
        method: RequestMethod.ALL,
      },
      { path: 'organizations/:orgSlug/comments', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/comments/task/:taskId', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/comments/:commentId', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/comments/:commentId/reactions', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/sprints/:sprintId/start', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/sprints/:sprintId/complete', method: RequestMethod.ALL },
      {
        path: 'organizations/:orgSlug/sprints/:sprintId/tasks/:taskId',
        method: RequestMethod.ALL,
      },
      { path: 'organizations/:orgSlug/time/start', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/time/stop', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/time/log', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/time/active', method: RequestMethod.ALL },
      { path: 'organizations/:orgSlug/time/entries', method: RequestMethod.ALL },
    );
    consumer
      .apply(TenantMiddleware)
      .forRoutes(
        { path: 'organizations/:orgSlug', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/invitations', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/invitations/:token/accept', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/projects', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/projects/:projectId', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/tasks', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/tasks/:taskId', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/sprints', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/sprints/:sprintId', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/sprints/:sprintId/tasks', method: RequestMethod.ALL },
        {
          path: 'organizations/:orgSlug/sprints/:sprintId/tasks/:taskId',
          method: RequestMethod.ALL,
        },
        { path: 'organizations/:orgSlug/comments', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/comments/task/:taskId', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/comments/:commentId', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/comments/:commentId/reactions', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/sprints/:sprintId/start', method: RequestMethod.ALL },
        { path: 'organizations/:orgSlug/sprints/:sprintId/complete', method: RequestMethod.ALL },
        {
          path: 'organizations/:orgSlug/sprints/:sprintId/tasks/:taskId',
          method: RequestMethod.ALL,
        },
      );
  }
}
