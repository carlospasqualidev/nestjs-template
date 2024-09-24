import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ErrorCollector extends Error {
  private errors: string[] = [];

  constructor() {
    super();
    this.name = 'ErrorCollector';
  }

  add(error?: string) {
    if (error) this.errors.push(error);
  }

  getAll(): string[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  throwIfAny(): void {
    if (this.hasErrors()) throw this;
  }
}
