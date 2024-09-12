import {
  PipeTransform,
  ArgumentMetadata,
  //   BadRequestException,
} from '@nestjs/common';

export class TrimPipe implements PipeTransform {
  private isObject(object: any): boolean {
    return typeof object === 'object' && object !== null;
  }

  private isString(value: any): boolean {
    return typeof value === 'string';
  }

  private isArray(value: any): boolean {
    return Array.isArray(value);
  }

  private trimString(value: string): string {
    return value.trim();
  }

  private process(data: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') return data;

    for (const key in data) {
      if (this.isString(data[key])) {
        data[key] = this.trimString(data[key]);
        continue;
      }

      if (this.isObject(data[key])) {
        data[key] = this.process(data[key], metadata);
        continue;
      }

      if (this.isArray(data[key])) {
        data[key] = data[key].map((item: any) => this.process(item, metadata));
        continue;
      }
    }

    return data;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    return this.process(values, metadata);
  }
}
