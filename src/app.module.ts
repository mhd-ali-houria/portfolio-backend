import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module.js';
import { Project } from './projects/entities/project.entity.js';
import { SupabaseModule } from './supabase/supabase.module.js';

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
        // Prefer a single DATABASE_URL when available (e.g. Supabase connection string).
        url: configService.get<string>('DATABASE_URL') ?? undefined,
        host: configService.get<string>('DATABASE_URL') ? undefined : 'localhost',
        // port: configService.get<number>('DB_PORT') ?? undefined,
        // username: configService.get<string>('DB_USER_NAME') ?? undefined,
        // password: configService.get<string>('DB_PWD') ?? undefined,
        // database: configService.get<string>('DB_NAME') ?? undefined,
        autoLoadEntities: true,
        // Disable automatic schema sync in production; rely on migrations.
        synchronize: configService.get<string>('NODE_ENV') === 'production' ? false : true,
        entities: [Project],
        extra: {
          // Connection pool sizing; can be tuned via DB_POOL_MAX env var.
          max: Number(configService.get<number>('DB_POOL_MAX') ?? 10),
          // Enable SSL for managed Postgres providers like Supabase.
          ssl: configService.get<string>('DATABASE_URL') || configService.get<string>('SUPABASE_URL') ? { rejectUnauthorized: false } : undefined,
        },
      }),
    }),

    ProjectsModule,
    SupabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
