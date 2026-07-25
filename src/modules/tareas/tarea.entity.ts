import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_proyecto', type: 'int' })
  id_proyecto: number;

  @ManyToOne(() => Proyecto)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto: Proyecto;

  @Column({ name: 'nombre_modulo', type: 'varchar', length: 255 })
  nombre_modulo: string;

  @Column({ name: 'nombre_entidad', type: 'varchar', length: 255 })
  nombre_entidad: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ name: 'tipo_tarea', type: 'varchar', length: 20, default: 'create' })
  tipo_tarea: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  estado: string;

  @Column({ type: 'int', default: 1 })
  prioridad: number;

  @Column({ name: 'hash_commit', type: 'varchar', length: 255, nullable: true })
  hash_commit: string;

  @Column({ name: 'tiempo_ejecucion_seg', type: 'int', nullable: true })
  tiempo_ejecucion_seg: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
