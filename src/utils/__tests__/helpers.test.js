import { formatTime, debounce, throttle, clamp, capitalize } from '../helpers';

describe('helpers', () => {
  describe('formatTime', () => {
    test('formats seconds correctly', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3661)).toBe('61:01');
    });
  });

  describe('debounce', () => {
    test('delays function execution', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 50);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);
      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
  });

  describe('throttle', () => {
    test('limits function execution rate', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 50);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);
      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 100);
    });
  });

  describe('clamp', () => {
    test('clamps values between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(5, 10, 20)).toBe(10);
    });
  });

  describe('capitalize', () => {
    test('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('HELLO');
      expect(capitalize('hELLO')).toBe('HELLO');
    });
  });
});

