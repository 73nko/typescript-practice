/**
 * Different implementations of calculating the nth Fibonacci number
 */
import { compareSolutions, Solution } from '../utils/benchmark';

// Recursive solution
export function fibonacciRecursive(n: number): number {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Dynamic programming solution
export function fibonacciDP(n: number): number {
  if (n <= 1) return n;

  let prev = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}

// Generator-based solution
export function* fibonacciGenerator(): Generator<number> {
  let prev = 0;
  let current = 1;

  while (true) {
    yield current;
    [prev, current] = [current, prev + current];
  }
}

export function fibonacciGenerator_nth(n: number): number {
  if (n <= 1) return n;

  const gen = fibonacciGenerator();
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result = gen.next().value;
  }
  return result;
}

// Main function to demonstrate the implementations
export function main() {
  // Basic demonstration
  const n = 10;
  console.log(`Calculating Fibonacci number for n = ${n}`);
  console.log('Recursive:', fibonacciRecursive(n));
  console.log('Dynamic Programming:', fibonacciDP(n));
  console.log('Generator:', fibonacciGenerator_nth(n));

  // Demonstrate generator sequence
  console.log('\nFirst 10 Fibonacci numbers using generator:');
  const gen = fibonacciGenerator();
  for (let i = 1; i <= 10; i++) {
    console.log(`F(${i}) = ${gen.next().value}`);
  }

  // Benchmark different implementations
  console.log('\nBenchmarking implementations for n = 20:');
  const solutions: Solution<number, number>[] = [
    { name: 'Recursive', fn: fibonacciRecursive },
    { name: 'Dynamic Programming', fn: fibonacciDP },
    { name: 'Generator', fn: fibonacciGenerator_nth },
  ];

  // Run benchmarks with verification that all solutions produce the same result
  compareSolutions(20, solutions, { verify: true });
}
