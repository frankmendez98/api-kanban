import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 25 })
  nombre_corto: string;

  @Column({ type: 'varchar', length: 255 })
  estados_permitidos: string;

  @Column({ nullable: true })
  clase: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) // Fecha de creación
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) // Fecha de última actualización
  updatedAt: Date;
}
