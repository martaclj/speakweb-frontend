import { PastPipe } from './past.pipe';

describe('PastPipe', () => {
  it('create an instance', () => {
    const pipe = new PastPipe();
    expect(pipe).toBeTruthy();
  });
});
