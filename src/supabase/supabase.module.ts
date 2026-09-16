import { Module, Global } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      useFactory: () => {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SECRET_KEY;
        if (!url || !key) {
          console.warn('Supabase client not configured: SUPABASE_URL or SUPABASE_SECRET_KEY missing');
          return null as unknown as SupabaseClient;
        }

        return createClient(url, key, {
          auth: {
            // keep server-side behavior (service role) — do not expose to browsers
            persistSession: false,
          },
        });
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
