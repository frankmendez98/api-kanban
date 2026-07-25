import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tarea } from '../tareas/tarea.entity';

@Entity('registros_tareas')
export class RegistroTarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_tarea', type: 'int' })
  id_tarea: number;

  @ManyToOne(() => Tarea)
  @JoinColumn({ name: 'id_tarea' })
  tarea: Tarea;

  @Column({ name: 'numero_intento', type: 'int' })
  numero_intento: number;

  @Column({ type: 'varchar', length: 20 })
  estado: string;

  @Column({ name: 'salida_error', type: 'text', nullable: true })
  salida_error: string;

  @Column({ name: 'tokens_utilizados', type: 'int', nullable: true })
  tokens_utilizados: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
