import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTimeTrackingTables1700000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "time_entries" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "task_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "description" text,
        "started_at" timestamptz NOT NULL,
        "ended_at" timestamptz,
        "duration_seconds" integer,
        "is_running" boolean NOT NULL DEFAULT true,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_time_entries" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "active_timers" (
        "id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "task_id" uuid NOT NULL,
        "time_entry_id" uuid NOT NULL,
        "started_at" timestamptz NOT NULL,
        CONSTRAINT "PK_active_timers" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_active_timers_user" UNIQUE ("user_id")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_time_entries_task" ON "time_entries" ("task_id", "org_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_time_entries_user" ON "time_entries" ("user_id", "org_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_active_timers_user" ON "active_timers" ("user_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_active_timers_user"`);
    await queryRunner.query(`DROP INDEX "IDX_time_entries_user"`);
    await queryRunner.query(`DROP INDEX "IDX_time_entries_task"`);
    await queryRunner.query(`DROP TABLE "active_timers"`);
    await queryRunner.query(`DROP TABLE "time_entries"`);
  }
}
