import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Estado } from '../estados/estado.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 500 })
  url_repositorio: string;

  @Column({ type: 'varchar', length: 500 })
  ruta_local: string;

  @Column({ type: 'varchar', length: 50, default: 'nestjs' })
  stack_predeterminado: string;

  @Column({ name: 'id_estado', type: 'int', nullable: true })
  id_estado: number;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
