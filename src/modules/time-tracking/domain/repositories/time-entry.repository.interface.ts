import { TimeEntry } from '../entities/time-entry.entity';

export const TIME_ENTRY_REPOSITORY = Symbol('ITimeEntryRepository');

export interface ITimeEntryRepository {
  findById(id: string, orgId: string): Promise<TimeEntry | null>;
  findAllByTask(taskId: string, orgId: string): Promise<TimeEntry[]>;
  findAllByUser(userId: string, orgId: string): Promise<TimeEntry[]>;
  findRunningByUser(userId: string): Promise<TimeEntry | null>;
  save(entry: TimeEntry): Promise<TimeEntry>;
  update(entry: TimeEntry): Promise<TimeEntry>;
  getTotalSecondsByTask(taskId: string): Promise<number>;
}
