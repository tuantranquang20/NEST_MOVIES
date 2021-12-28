import * as moment from 'moment';
declare module 'moment' {
  interface Moment {
    /**
     * format YYYY-MM-DD HH:mm
     * @return string
     */
    fmFullTimeWithoutSecond(): string;
    /**
     * format YYYY-MM-DD HH:mm:ss
     * @return string
     */
    fmFullTimeString(): string;
    /**
     * format YYYY-MM-DD
     * @return string
     */
    fmDayString(): string;
    /**
     * get start of day
     * @return Moment
     */
    startOfDay(): moment.Moment;
    /**
     * get start of day
     * @return string format YYYY-MM-DD HH:mm:ss
     */
    startOfDayString(): string;
    /**
     * get end of day
     * @return Moment
     */
    endOfDay(): moment.Moment;
    /**
     * get end of day
     * @return string format YYYY-MM-DD HH:mm:ss
     */
    endOfDayString(): string;
    /**
     * get start of tomorrow
     * @return Moment
     */
    startOfTomorrow(): moment.Moment;
    /**
     * get start of tomorrow
     * @return string format YYYY-MM-DD HH:mm:ss
     */
    startOfTomorrowString(): string;
    /**
     * get end of tomorrow
     * @return Moment
     */
    endOfTomorrow(): moment.Moment;
    /**
     * get end of tomorrow
     * @return string format YYYY-MM-DD HH:mm:ss
     */
    endOfTomorrowString(): string;
    /**
     * round second into 0
     * @return Moment
     */
    zeroSecond(): moment.Moment;
    /**
     * format HH:mm
     * @return string
     */
    fmHourMinuteString(): string;
    /**
     * format DD-MM
     * @return string
     */
    fmDayMonthString(): string;
    /**
     * format dddd
     * @return string
     */
    fmDayOfWeekString(): string;
    /**
     * format DD
     * @return string
     */
    fmDayOnlyString(): string;
    /**
     * format HH
     * @return string
     */
    fmHourOnlyTimeString(): string;
    /**
     * format MMMM
     * @return string
     */
    fmNameMonthString(): string;
    /**
     * format YYYY
     * @return string
     */
    fmYearString(): string;
    /**
     * format YYYY-MM
     * @return string
     */
    fmYearMonthString(): string;
    /**
     * format MM
     * @return string
     */
    fmMonthString(): string;
    /**
     * format ddd MMM DD YYYY
     * @return string
     */
    fmWeekString(): string;
    /**
     * format HH:mm:ss
     * @return string
     */
    fmTimeString(): string;
    /**
     * format d
     * @return number
     */
    fmDateOfWeekNumber(): number;
    /**
     * format YYYY-MM-DD HH:mm:ss
     * @return number
     */
    fmAddOneDay(): moment.Moment;
    /**
     * format YYYY-MM-DD HH:mm:ss
     * @return number
     */
    fmSubtractOneDay(): moment.Moment;
    /**
     * format HH:mm A
     * @return number
     */
    fmAMPM(): string;
    /**
     * format YYYY-MM-DD
     * @return string
     */
    fmYesterDayString(): string;
    /**
     * format YYYY-MM-DD
     * @return string
     */
    fmTomorrowDayString(): string;
    /**
     * format YYYY-MM-DD(MMM)
     * @return string
     */
    fmDayOfWeekEn(): string;
    fmMonthOfYearEn(): string;
  }
}

moment.fn.fmFullTimeWithoutSecond = function (): string {
  return this.format('YYYY-MM-DD HH:mm');
};

moment.fn.fmFullTimeString = function (): string {
  return this.format('YYYY-MM-DD HH:mm:ss');
};

moment.fn.fmDayString = function (): string {
  return this.format('YYYY-MM-DD');
};

moment.fn.startOfDay = function (): moment.Moment {
  return this.clone().startOf('day');
};

moment.fn.startOfDayString = function (): string {
  return this.clone().startOf('day').fmFullTimeString();
};

moment.fn.endOfDay = function (): moment.Moment {
  return this.clone().endOf('day');
};

moment.fn.endOfDayString = function (): string {
  return this.clone().endOf('day').fmFullTimeString();
};

moment.fn.startOfTomorrow = function (): moment.Moment {
  return this.clone().add(1, 'day').startOf('day');
};

moment.fn.startOfTomorrowString = function (): string {
  return this.clone().add(1, 'day').startOf('day').fmFullTimeString();
};

moment.fn.endOfTomorrow = function (): moment.Moment {
  return this.clone().add(1, 'day').endOf('day');
};

moment.fn.endOfTomorrowString = function (): string {
  return this.clone().add(1, 'day').endOf('day').fmFullTimeString();
};
moment.fn.zeroSecond = function (): moment.Moment {
  return this.set('second', 0);
};

moment.fn.fmHourMinuteString = function (): string {
  return this.format('HH:mm');
};

moment.fn.fmDayMonthString = function (): string {
  return this.format('DD-MM');
};

moment.fn.fmDayOfWeekString = function (): string {
  return this.format('dddd');
};

moment.fn.fmDayOnlyString = function (): string {
  return this.format('D');
};

moment.fn.fmHourOnlyTimeString = function (): string {
  return this.format('HH');
};

moment.fn.fmNameMonthString = function (): string {
  return this.format('MMMM');
};

moment.fn.fmYearString = function (): string {
  return this.format('YYYY');
};

moment.fn.fmYearMonthString = function (): string {
  return this.format('YYYY-MM');
};

moment.fn.fmMonthString = function (): string {
  return this.format('MM');
};

moment.fn.fmWeekString = function (): string {
  return this.format('ddd MMM DD YYYY');
};
moment.fn.fmTimeString = function (): string {
  return this.format('HH:mm:ss');
};
moment.fn.fmDateOfWeekNumber = function (): number {
  return +this.format('d');
};
moment.fn.fmAddOneDay = function (): moment.Moment {
  return this.clone().add(1, 'd');
};
moment.fn.fmSubtractOneDay = function (): moment.Moment {
  return this.clone().subtract(1, 'd');
};
moment.fn.fmAMPM = function (): string {
  return this.clone().format('HH:mm A');
};
moment.fn.fmYesterDayString = function (): string {
  return this.clone().subtract(1, 'day').fmDayString();
};
moment.fn.fmTomorrowDayString = function (): string {
  return this.clone().add(1, 'day').fmDayString();
};
moment.fn.fmDayOfWeekEn = function (): string {
  return this.clone().locale('en').format('YYYY/MM/DD ( ddd )');
};
moment.fn.fmMonthOfYearEn = function (): string {
  return this.locale('en').format('MMMM YYYY');
};
