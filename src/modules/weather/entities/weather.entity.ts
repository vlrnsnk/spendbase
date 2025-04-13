import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Latitude (-90.00 to 90.00)',
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    comment: 'Longitude (-180.00 to 180.00)',
  })
  longitude: number;

  @Column({
    name: 'excluded_parts',
    type: 'varchar',
    length: 50,
    nullable: true,
    comment:
      'Excluded parts (comma separated: current, minutely, hourly, daily, alerts)',
  })
  excludedParts: string | null;

  @Column('jsonb', {
    name: 'raw_api_response',
    comment: 'Complete API response data',
  })
  rawApiResponse: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
