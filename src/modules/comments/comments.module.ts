import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentOrmEntity } from './infrastructure/persistence/typeorm/comment.orm-entity';
import { ReactionOrmEntity } from './infrastructure/persistence/typeorm/reaction.orm-entity';
import { CommentRepository } from './infrastructure/persistence/typeorm/comment.repository';
import { ReactionRepository } from './infrastructure/persistence/typeorm/reaction.repository';
import { CreateCommentHandler } from './application/handlers/create-comment.handler';
import { UpdateCommentHandler } from './application/handlers/update-comment.handler';
import { DeleteCommentHandler } from './application/handlers/delete-comment.handler';
import { ListCommentsHandler } from './application/handlers/list-comments.handler';
import { ToggleReactionHandler } from './application/handlers/toggle-reaction.handler';
import { CommentsController } from './presentation/comments.controller';
import { COMMENT_REPOSITORY } from './domain/repositories/comment.repository.interface';
import { REACTION_REPOSITORY } from './domain/repositories/reaction.repository.interface';
import { OrganizationsModule } from '../organizations/organizations.module';

const CommandHandlers = [
  CreateCommentHandler,
  UpdateCommentHandler,
  DeleteCommentHandler,
  ToggleReactionHandler,
];

const QueryHandlers = [ListCommentsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentOrmEntity, ReactionOrmEntity]),
    OrganizationsModule,
  ],
  controllers: [CommentsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: COMMENT_REPOSITORY, useClass: CommentRepository },
    { provide: REACTION_REPOSITORY, useClass: ReactionRepository },
  ],
  exports: [COMMENT_REPOSITORY, REACTION_REPOSITORY],
})
export class CommentsModule {}
