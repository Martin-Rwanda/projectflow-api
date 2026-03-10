import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectsAndTasksTables1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "description" text,
        "icon" varchar,
        "color" varchar,
        "visibility" varchar NOT NULL DEFAULT 'public_to_org',
        "status" varchar NOT NULL DEFAULT 'active',
        "owner_id" uuid NOT NULL,
        "created_by" uuid NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_projects_slug_org" UNIQUE ("slug", "org_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "task_statuses" (
        "id" uuid NOT NULL,
        "project_id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "color" varchar NOT NULL,
        "category" varchar NOT NULL,
        "position" integer NOT NULL DEFAULT 0,
        "is_default" boolean NOT NULL DEFAULT false,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_task_statuses" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "project_id" uuid NOT NULL,
        "title" varchar NOT NULL,
        "description" jsonb,
        "status_id" uuid NOT NULL,
        "priority" varchar NOT NULL DEFAULT 'none',
        "assignee_id" uuid,
        "reporter_id" uuid NOT NULL,
        "parent_task_id" uuid,
        "order" float NOT NULL DEFAULT 0,
        "due_date" timestamptz,
        "started_at" timestamptz,
        "completed_at" timestamptz,
        "estimated_hours" float,
        "logged_hours" float NOT NULL DEFAULT 0,
        "created_by" uuid NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        CONSTRAINT "PK_tasks" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`CREATE INDEX "IDX_projects_org" ON "projects" ("org_id")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_task_statuses_project" ON "task_statuses" ("project_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_tasks_org" ON "tasks" ("org_id")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_project_status" ON "tasks" ("project_id", "status_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_assignee" ON "tasks" ("assignee_id") WHERE deleted_at IS NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tasks_order" ON "tasks" ("project_id", "order") WHERE deleted_at IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_tasks_order"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_assignee"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_project_status"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_org"`);
    await queryRunner.query(`DROP INDEX "IDX_task_statuses_project"`);
    await queryRunner.query(`DROP INDEX "IDX_projects_org"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "task_statuses"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
