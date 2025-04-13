import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameWeatherColumns1744505893043 implements MigrationInterface {
  name = 'RenameWeatherColumns1744505893043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "exclude" TO "excluded_parts"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "weather"."excluded_parts" IS 'Excluded parts (comma separated: current, minutely, hourly, daily, alerts)'`,
    );

    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "apiResponse" TO "raw_api_response"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "weather"."raw_api_response" IS 'Complete API response data'`,
    );

    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "createdAt" TO "created_at"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "created_at" TO "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "raw_api_response" TO "apiResponse"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weather" RENAME COLUMN "excluded_parts" TO "exclude"`,
    );
  }
}
