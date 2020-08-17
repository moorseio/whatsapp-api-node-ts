import {MigrationInterface, QueryRunner} from 'typeorm';

export default class MigrationByModel1597539457816
  implements MigrationInterface {
  name = 'MigrationByModel1597539457816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "token" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "initial" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "number" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "position" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "menu_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_items" ("products_id" integer NOT NULL, "items_id" integer NOT NULL, PRIMARY KEY ("products_id", "items_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8ae121389d8ee260a93a196da" ON "products_items" ("products_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7036d08a62813970f2d0b6a2d0" ON "products_items" ("items_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer, CONSTRAINT "FK_43bf812728ba3a76d1712d72f89" FOREIGN KEY ("users_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products"("id", "status", "created_at", "updated_at", "users_id") SELECT "id", "status", "created_at", "updated_at", "users_id" FROM "products"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products" RENAME TO "products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "position" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "menu_id" integer, CONSTRAINT "FK_6fc4407299919279794df086d3c" FOREIGN KEY ("menu_id") REFERENCES "menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_items"("id", "name", "type", "position", "created_at", "updated_at", "menu_id") SELECT "id", "name", "type", "position", "created_at", "updated_at", "menu_id" FROM "items"`,
    );
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`ALTER TABLE "temporary_items" RENAME TO "items"`);
    await queryRunner.query(`DROP INDEX "IDX_f8ae121389d8ee260a93a196da"`);
    await queryRunner.query(`DROP INDEX "IDX_7036d08a62813970f2d0b6a2d0"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_products_items" ("products_id" integer NOT NULL, "items_id" integer NOT NULL, CONSTRAINT "FK_f8ae121389d8ee260a93a196dac" FOREIGN KEY ("products_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_7036d08a62813970f2d0b6a2d01" FOREIGN KEY ("items_id") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("products_id", "items_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_products_items"("products_id", "items_id") SELECT "products_id", "items_id" FROM "products_items"`,
    );
    await queryRunner.query(`DROP TABLE "products_items"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_products_items" RENAME TO "products_items"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8ae121389d8ee260a93a196da" ON "products_items" ("products_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7036d08a62813970f2d0b6a2d0" ON "products_items" ("items_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7036d08a62813970f2d0b6a2d0"`);
    await queryRunner.query(`DROP INDEX "IDX_f8ae121389d8ee260a93a196da"`);
    await queryRunner.query(
      `ALTER TABLE "products_items" RENAME TO "temporary_products_items"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_items" ("products_id" integer NOT NULL, "items_id" integer NOT NULL, PRIMARY KEY ("products_id", "items_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "products_items"("products_id", "items_id") SELECT "products_id", "items_id" FROM "temporary_products_items"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products_items"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_7036d08a62813970f2d0b6a2d0" ON "products_items" ("items_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8ae121389d8ee260a93a196da" ON "products_items" ("products_id") `,
    );
    await queryRunner.query(`ALTER TABLE "items" RENAME TO "temporary_items"`);
    await queryRunner.query(
      `CREATE TABLE "items" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL, "position" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "menu_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "items"("id", "name", "type", "position", "created_at", "updated_at", "menu_id") SELECT "id", "name", "type", "position", "created_at", "updated_at", "menu_id" FROM "temporary_items"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_items"`);
    await queryRunner.query(
      `ALTER TABLE "products" RENAME TO "temporary_products"`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "products"("id", "status", "created_at", "updated_at", "users_id") SELECT "id", "status", "created_at", "updated_at", "users_id" FROM "temporary_products"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_products"`);
    await queryRunner.query(`DROP INDEX "IDX_7036d08a62813970f2d0b6a2d0"`);
    await queryRunner.query(`DROP INDEX "IDX_f8ae121389d8ee260a93a196da"`);
    await queryRunner.query(`DROP TABLE "products_items"`);
    await queryRunner.query(`DROP TABLE "items"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "menu"`);
    await queryRunner.query(`DROP TABLE "config"`);
  }
}
