import Benchmark from 'benchmark';

export interface Solution<T, R> {
  name: string;
  fn: (input: T) => R;
}

export function compareSolutions<T, R>(
  input: T,
  solutions: Solution<T, R>[],
  options: {
    verify?: boolean;
    onComplete?: (results: string) => void;
  } = {},
): void {
  const suite = new Benchmark.Suite();

  // Verify all solutions return the same result if verify is true
  if (options.verify) {
    const results = solutions.map((s) => s.fn(input));
    const firstResult = JSON.stringify(results[0]);
    const allSame = results.every((r) => JSON.stringify(r) === firstResult);
    if (!allSame) {
      console.error('Warning: Not all solutions return the same result!');
      solutions.forEach((s, i) => {
        console.log(`${s.name}: ${JSON.stringify(results[i])}`);
      });
    }
  }

  // Add solutions to benchmark suite
  solutions.forEach((solution) => {
    suite.add(solution.name, () => {
      solution.fn(input);
    });
  });

  // Run benchmarks
  suite
    .on('cycle', (event: Benchmark.Event) => {
      console.log(String(event.target));
    })
    .on('complete', function (this: Benchmark.Suite) {
      const fastest = this.filter('fastest').map('name');
      const results = `\nFastest solution: ${fastest}\n`;
      console.log(results);
      if (options.onComplete) {
        options.onComplete(results);
      }
    })
    .run({ async: true });
}
