import { ActiveTimer } from '../entities/active-timer.entity';

export const ACTIVE_TIMER_REPOSITORY = Symbol('IActiveTimerRepository');

export interface IActiveTimerRepository {
  findByUser(userId: string): Promise<ActiveTimer | null>;
  save(timer: ActiveTimer): Promise<ActiveTimer>;
  deleteByUser(userId: string): Promise<void>;
}
