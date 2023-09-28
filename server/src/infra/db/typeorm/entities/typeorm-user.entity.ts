import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOrmUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
