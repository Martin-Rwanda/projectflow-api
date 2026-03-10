import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntryOrmEntity } from './infrastructure/persistence/typeorm/time-entry.orm-entity';
import { ActiveTimerOrmEntity } from './infrastructure/persistence/typeorm/active-timer.orm-entity';
import { TimeEntryRepository } from './infrastructure/persistence/typeorm/time-entry.repository';
import { ActiveTimerRepository } from './infrastructure/persistence/typeorm/active-timer.repository';
import { StartTimerHandler } from './application/handlers/start-timer.handler';
import { StopTimerHandler } from './application/handlers/stop-timer.handler';
import { LogTimeHandler } from './application/handlers/log-time.handler';
import { GetActiveTimerHandler } from './application/handlers/get-active-timer.handler';
import { ListTimeEntriesHandler } from './application/handlers/list-time-entries.handler';
import { TimeTrackingController } from './presentation/time-tracking.controller';
import { TIME_ENTRY_REPOSITORY } from './domain/repositories/time-entry.repository.interface';
import { ACTIVE_TIMER_REPOSITORY } from './domain/repositories/active-timer.repository.interface';
import { OrganizationsModule } from '../organizations/organizations.module';

const CommandHandlers = [StartTimerHandler, StopTimerHandler, LogTimeHandler];
const QueryHandlers = [GetActiveTimerHandler, ListTimeEntriesHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TimeEntryOrmEntity, ActiveTimerOrmEntity]),
    OrganizationsModule,
  ],
  controllers: [TimeTrackingController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: TIME_ENTRY_REPOSITORY, useClass: TimeEntryRepository },
    { provide: ACTIVE_TIMER_REPOSITORY, useClass: ActiveTimerRepository },
  ],
  exports: [TIME_ENTRY_REPOSITORY, ACTIVE_TIMER_REPOSITORY],
})
export class TimeTrackingModule {}
