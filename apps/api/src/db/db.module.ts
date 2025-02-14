import { neonConfig, Pool } from '@neondatabase/serverless';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as devDrizzle } from 'drizzle-orm/node-postgres';
import { WebSocket } from 'ws';
import * as schema from './schema';
import { DATABASE } from './consts';

@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService) => {
        const connectionString: string =
          configService.getOrThrow('DATABASE_URL');

        if (process.env.NODE_ENV === 'production') {
          neonConfig.webSocketConstructor = WebSocket;
          neonConfig.poolQueryViaFetch = true;
        } else {
          return devDrizzle(connectionString);
        }

        const pool = new Pool({
          connectionString,
        });
        return drizzle(pool, { schema: { ...schema } });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
