import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProyectosToTable1784950455723 implements MigrationInterface {
    name = 'AlterProyectosToTable1784950455723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proyectos" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "url_repositorio" character varying(500) NOT NULL, "ruta_local" character varying(500) NOT NULL, "stack_predeterminado" character varying(50) NOT NULL DEFAULT 'nestjs', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4763a49914127cbdde2143db52a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tareas" ("id" SERIAL NOT NULL, "id_proyecto" integer NOT NULL, "nombre_modulo" character varying(255) NOT NULL, "nombre_entidad" character varying(255) NOT NULL, "titulo" character varying(255) NOT NULL, "descripcion" text NOT NULL, "tipo_tarea" character varying(20) NOT NULL DEFAULT 'create', "estado" character varying(20) NOT NULL DEFAULT 'pending', "prioridad" integer NOT NULL DEFAULT '1', "hash_commit" character varying(255), "tiempo_ejecucion_seg" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9370ac1b0569cacf8cda6815c97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registros_tareas" ("id" SERIAL NOT NULL, "id_tarea" integer NOT NULL, "numero_intento" integer NOT NULL, "estado" character varying(20) NOT NULL, "salida_error" text, "tokens_utilizados" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6d8355168afd6e61d2013c748a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estados" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "nombre_corto" character varying(25) NOT NULL, "estados_permitidos" character varying(255) NOT NULL, "clase" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d9a9f2658d5086012f27924d30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tareas" ADD CONSTRAINT "FK_14c3d06854635977033ed82536f" FOREIGN KEY ("id_proyecto") REFERENCES "proyectos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_tareas" ADD CONSTRAINT "FK_05f45127a35491cb48903af136a" FOREIGN KEY ("id_tarea") REFERENCES "tareas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registros_tareas" DROP CONSTRAINT "FK_05f45127a35491cb48903af136a"`);
        await queryRunner.query(`ALTER TABLE "tareas" DROP CONSTRAINT "FK_14c3d06854635977033ed82536f"`);
        await queryRunner.query(`DROP TABLE "estados"`);
        await queryRunner.query(`DROP TABLE "registros_tareas"`);
        await queryRunner.query(`DROP TABLE "tareas"`);
        await queryRunner.query(`DROP TABLE "proyectos"`);
    }

}
