class dateTimeAdd {
  private date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  public days(amount: number) {
    this.date.setDate(this.date.getDate() + amount);
    return this.date;
  }

  public months(amount: number) {
    this.date.setMonth(this.date.getMonth() + amount);
    return this.date;
  }

  public years(amount: number) {
    this.date.setFullYear(this.date.getFullYear() + amount);
    return this.date;
  }

  public minutes(amount: number) {
    this.date.setMinutes(this.date.getMinutes() + amount);
    return this.date;
  }

  public hours(amount: number) {
    this.date.setHours(this.date.getHours() + amount);
    return this.date;
  }
}

class dateTimeRemove {
  private date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  public days(amount: number) {
    this.date.setDate(this.date.getDate() - amount);
    return this.date;
  }

  public months(amount: number) {
    this.date.setMonth(this.date.getMonth() - amount);
    return this.date;
  }

  public years(amount: number) {
    this.date.setFullYear(this.date.getFullYear() - amount);
    return this.date;
  }

  public minutes(amount: number) {
    this.date.setMinutes(this.date.getMinutes() - amount);
    return this.date;
  }

  public hours(amount: number) {
    this.date.setHours(this.date.getHours() - amount);
    return this.date;
  }
}

class dateTimeFormat {
  private dateParam: Date;

  constructor(date: Date) {
    this.dateParam = date;
  }

  public date() {
    this.dateParam.toLocaleDateString('pt-BR');
    return this.dateParam;
  }

  public dateAndTime() {
    this.dateParam.toLocaleString('pt-BR');
    return this.dateParam;
  }

  public time() {
    this.dateParam.toLocaleTimeString('pt-BR');
    return this.dateParam;
  }
}

class dateTimeSet {
  private date: Date;
  private add: dateTimeAdd;

  constructor(date: Date) {
    this.date = date;
    this.add = new dateTimeAdd(date);
  }

  public utcMidnight() {
    this.date = new Date(this.date.setUTCHours(3, 0, 0, 0));
    return this.date;
  }
  public utcEndOfDay() {
    const date = this.add.days(1);
    this.date = new Date(date.setUTCHours(2, 59, 59, 999));

    return this.date;
  }
}

export const dateTime = {
  add: (date: Date) => new dateTimeAdd(date),
  remove: (date: Date) => new dateTimeRemove(date),
  format: (date: Date) => new dateTimeFormat(date),
  set: (date: Date) => new dateTimeSet(date),
};
