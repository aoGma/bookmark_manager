import { HttpExceptionFilter } from './http-filter.filter';

describe('HttpFilterFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
