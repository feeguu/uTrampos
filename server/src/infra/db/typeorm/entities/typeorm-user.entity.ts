import { UserType } from '@/domain/enums/user-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class TypeOrmUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  zipCode: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;
}
