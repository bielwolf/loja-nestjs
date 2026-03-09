import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTabelas1773096437045 implements MigrationInterface {
  name = 'CriaTabelas1773096437045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "descricao" character varying(1000) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" character varying NOT NULL, "nome" character varying(100) NOT NULL, "valor" integer NOT NULL, "quantidade_disponivel" integer NOT NULL, "descricao" character varying(1000) NOT NULL, "categoria" character varying(100) NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prduto_imagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "descricao" character varying(1000) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_e8486f6c80c94e00cc6ee1d9792" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "prduto_imagens" ADD CONSTRAINT "FK_2f1f77fbd78ee8a420865dcafbe" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prduto_imagens" DROP CONSTRAINT "FK_2f1f77fbd78ee8a420865dcafbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`,
    );
    await queryRunner.query(`DROP TABLE "prduto_imagens"`);
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
