import {
  fibonacciRecursive,
  fibonacciDP,
  fibonacciGenerator_nth,
} from './fibonacci';
import { compareSolutions, Solution } from '../utils/benchmark';

describe('Fibonacci Implementations', () => {
  const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 2, expected: 1 },
    { input: 3, expected: 2 },
    { input: 5, expected: 5 },
    { input: 10, expected: 55 },
  ];

  // Test each implementation separately
  describe('Recursive Implementation', () => {
    test.each(testCases)(
      'fibonacci($input) = $expected',
      ({ input, expected }) => {
        expect(fibonacciRecursive(input)).toBe(expected);
      }
    );
  });

  describe('Dynamic Programming Implementation', () => {
    test.each(testCases)(
      'fibonacci($input) = $expected',
      ({ input, expected }) => {
        expect(fibonacciDP(input)).toBe(expected);
      }
    );
  });

  describe('Generator Implementation', () => {
    test.each(testCases)(
      'fibonacci($input) = $expected',
      ({ input, expected }) => {
        expect(fibonacciGenerator_nth(input)).toBe(expected);
      }
    );
  });

  // Benchmark different implementations
  describe('Benchmarks', () => {
    test('Compare solutions for n=20', () => {
      const solutions: Solution<number, number>[] = [
        { name: 'Recursive', fn: fibonacciRecursive },
        { name: 'Dynamic Programming', fn: fibonacciDP },
        { name: 'Generator', fn: fibonacciGenerator_nth },
      ];

      compareSolutions(20, solutions, { verify: true });
    });
  });
});
