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
    scale:  2,
    comment: 'Longitude (-180.00 to 180.00)',
  })
  longitude: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Excluded parts (comma separated: current, minutely, hourly, daily, alerts)',
  })
  exclude: string | null;

  @Column('jsonb', {
    comment: 'Complete API response data',
  })
  apiResponse: any;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
