import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeatherTable1744577108930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS weather (
                id SERIAL PRIMARY KEY,
                latitude DECIMAL(5,2) NOT NULL,
                longitude DECIMAL(6,2) NOT NULL,
                excluded_parts VARCHAR(50),
                raw_api_response JSONB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS weather;
      `);
  }
}
