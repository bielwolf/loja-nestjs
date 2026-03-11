import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1773193398983 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1773193398983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "produtosId" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_736f3a57efba3d634b6c810f5ee" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_736f3a57efba3d634b6c810f5ee"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "produtosId"`);
    }

}
