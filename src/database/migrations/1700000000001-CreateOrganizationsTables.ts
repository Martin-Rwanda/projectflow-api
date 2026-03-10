import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganizationsTables1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "organizations" (
        "id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "logo_url" varchar,
        "plan_id" varchar NOT NULL DEFAULT 'free',
        "members_count" integer NOT NULL DEFAULT 1,
        "projects_count" integer NOT NULL DEFAULT 0,
        "storage_used_bytes" bigint NOT NULL DEFAULT 0,
        "created_by" uuid NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_organizations" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_organizations_slug" UNIQUE ("slug")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "organization_members" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "role" varchar NOT NULL DEFAULT 'member',
        "status" varchar NOT NULL DEFAULT 'active',
        "invited_by" uuid,
        "joined_at" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_organization_members" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_org_member" UNIQUE ("org_id", "user_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "invitations" (
        "id" uuid NOT NULL,
        "org_id" uuid NOT NULL,
        "email" varchar NOT NULL,
        "role" varchar NOT NULL DEFAULT 'member',
        "token" varchar NOT NULL,
        "invited_by" uuid NOT NULL,
        "expires_at" timestamptz NOT NULL,
        "accepted_at" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_invitations" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_invitations_token" UNIQUE ("token")
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_org_members_org" ON "organization_members" ("org_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_org_members_user" ON "organization_members" ("user_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_invitations_token" ON "invitations" ("token")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_invitations_token"`);
    await queryRunner.query(`DROP INDEX "IDX_org_members_user"`);
    await queryRunner.query(`DROP INDEX "IDX_org_members_org"`);
    await queryRunner.query(`DROP TABLE "invitations"`);
    await queryRunner.query(`DROP TABLE "organization_members"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
  }
}
