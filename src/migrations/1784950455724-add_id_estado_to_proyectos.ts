import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdEstadoToProyectos1784950455724 implements MigrationInterface {
    name = 'AddIdEstadoToProyectos1784950455724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proyectos" ADD "id_estado" integer`);
        await queryRunner.query(`ALTER TABLE "proyectos" ADD CONSTRAINT "FK_estado_proyecto" FOREIGN KEY ("id_estado") REFERENCES "estados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proyectos" DROP CONSTRAINT "FK_estado_proyecto"`);
        await queryRunner.query(`ALTER TABLE "proyectos" DROP COLUMN "id_estado"`);
    }

}
