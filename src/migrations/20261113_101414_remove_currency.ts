import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "currency";
  DROP TYPE "public"."enum_site_settings_currency";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_currency" AS ENUM('IDR', 'USD');
  ALTER TABLE "site_settings" ADD COLUMN "currency" "enum_site_settings_currency" DEFAULT 'USD' NOT NULL;`);
}
