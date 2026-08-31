import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module.js';
import { Project } from './projects/entities/project.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configure TypeORM asynchronously
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_PWD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [Project]
      }),
    }),

    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
