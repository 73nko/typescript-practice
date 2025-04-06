import Benchmark from 'benchmark';

export interface Solution<T, R> {
  name: string;
  fn: (_: T) => R;
}

export function compareSolutions<T, R>(
  testInput: T,
  solutions: Solution<T, R>[],
  options: {
    verify?: boolean;
    onComplete?: (_: string) => void;
  } = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const suite = new Benchmark.Suite();

    // Verify all solutions return the same result if verify is true
    if (options.verify) {
      const solutionResults = solutions.map((s) => s.fn(testInput));
      const firstResult = JSON.stringify(solutionResults[0]);
      const allSame = solutionResults.every((r) => JSON.stringify(r) === firstResult);
      if (!allSame) {
        console.error('Warning: Not all solutions return the same result!');
        solutions.forEach((s, i) => {
          console.log(`${s.name}: ${JSON.stringify(solutionResults[i])}`);
        });
      }
    }

    // Add solutions to benchmark suite
    solutions.forEach((solution) => {
      suite.add(solution.name, () => {
        solution.fn(testInput);
      });
    });

    // Run benchmarks
    suite
      .on('cycle', (event: Benchmark.Event) => {
        console.log(String(event.target));
      })
      .on('complete', () => {
        const fastest = suite.filter('fastest').map('name');
        const benchmarkResults = `\nFastest solution: ${fastest}\n`;
        console.log(benchmarkResults);
        if (options.onComplete) {
          options.onComplete(benchmarkResults);
        }
        resolve();
      })
      .on('error', (error: Error) => {
        reject(error);
      })
      .run({ async: true });
  });
}
