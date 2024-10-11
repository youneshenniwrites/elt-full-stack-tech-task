import { Module } from '@nestjs/common';

import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarDomainModule } from '../../../calendar-domain/src/lib/calendar-domain.module';

@Module({
  imports: [
    CalendarDomainModule.register(),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class AppModule {}
