import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSprintsAndCommentsTables1700000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "sprints" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "project_id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "goal" text,
        "status" varchar NOT NULL DEFAULT 'planning',
        "start_date" timestamptz,
        "end_date" timestamptz,
        "created_by" uuid NOT NULL,
        "completed_at" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sprints" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "sprint_task_assignments" (
        "id" uuid NOT NULL,
        "sprint_id" uuid NOT NULL,
        "task_id" uuid NOT NULL,
        "added_by" uuid NOT NULL,
        "added_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sprint_task_assignments" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_sprint_task" UNIQUE ("sprint_id", "task_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "comments" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "task_id" uuid NOT NULL,
        "author_id" uuid NOT NULL,
        "body" jsonb NOT NULL,
        "is_edited" boolean NOT NULL DEFAULT false,
        "parent_comment_id" uuid,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        CONSTRAINT "PK_comments" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "reactions" (
        "id" uuid NOT NULL,
        "comment_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "emoji" varchar NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_reactions" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_reaction_user_emoji" UNIQUE ("comment_id", "user_id", "emoji")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_sprints_project" ON "sprints" ("project_id", "org_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_sprint_tasks_sprint" ON "sprint_task_assignments" ("sprint_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_comments_task" ON "comments" ("task_id", "org_id") WHERE deleted_at IS NULL`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_reactions_comment" ON "reactions" ("comment_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_reactions_comment"`);
    await queryRunner.query(`DROP INDEX "IDX_comments_task"`);
    await queryRunner.query(`DROP INDEX "IDX_sprint_tasks_sprint"`);
    await queryRunner.query(`DROP INDEX "IDX_sprints_project"`);
    await queryRunner.query(`DROP TABLE "reactions"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "sprint_task_assignments"`);
    await queryRunner.query(`DROP TABLE "sprints"`);
  }
}
