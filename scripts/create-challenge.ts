import fs from 'fs';
import path from 'path';

// Get the challenge name from command line
const challengeName = process.argv[2];
if (!challengeName) {
  console.error('Please provide a challenge name (e.g., "matrix")');
  process.exit(1);
}

// Find the next available day number
const srcDir = path.join(process.cwd(), 'src');
const existingDays = fs
  .readdirSync(srcDir)
  .filter((dir) => dir.match(/^day\d+/))
  .map((dir) => parseInt(dir.match(/^day(\d+)/)?.[1] || '0'))
  .sort((a, b) => b - a);

const nextDay = (existingDays[0] || 0) + 1;
const dirName = `day${nextDay}-${challengeName}`;
const dirPath = path.join(srcDir, dirName);

// Create the directory
fs.mkdirSync(dirPath);

// Create the main file
const mainFileContent = `import { compareSolutions, Solution } from '../utils/benchmark';

/**
 * Problem: ${challengeName}
 *
 * Description:
 * [Add your problem description here]
 */

export type Input = any; // Update with your input type
export type Output = any; // Update with your output type

export function solution1(input: Input): Output {
  // TODO: Implement your solution
  throw new Error('Solution not implemented');
}

export function solution2(input: Input): Output {
  // TODO: Implement your alternative solution
  throw new Error('Solution not implemented');
}

export function main() {
  // Example usage
  const simpleInput = null; // TODO: Add a simple example input
  console.log('Example with simple input:');
  // console.log(solution1(simpleInput));

  // Benchmark different implementations
  const solutions: Solution<Input, Output>[] = [
    { name: 'Solution 1', fn: solution1 },
    { name: 'Solution 2', fn: solution2 }
  ];

  const benchmarkInput = null; // TODO: Add benchmark input
  console.log('\\nRunning benchmarks...');
  compareSolutions(benchmarkInput, solutions, { verify: true });
}`;

const testFileContent = `import { solution1, solution2 } from './${challengeName}';

describe('${challengeName}', () => {
  describe('solution1', () => {
    it('should handle basic cases', () => {
      // TODO: Add test cases
      // expect(solution1(input)).toBe(expected);
    });

    it('should handle edge cases', () => {
      // TODO: Add edge cases
      // expect(solution1(input)).toBe(expected);
    });
  });

  describe('solution2', () => {
    it('should handle basic cases', () => {
      // TODO: Add test cases
      // expect(solution2(input)).toBe(expected);
    });

    it('should handle edge cases', () => {
      // TODO: Add edge cases
      // expect(solution2(input)).toBe(expected);
    });
  });
});`;

fs.writeFileSync(path.join(dirPath, `${challengeName}.ts`), mainFileContent);
fs.writeFileSync(
  path.join(dirPath, `${challengeName}.test.ts`),
  testFileContent
);

console.log(`Created new challenge in ${dirPath}`);
console.log('Files created:');
console.log(`- ${challengeName}.ts`);
console.log(`- ${challengeName}.test.ts`);
console.log('\nNext steps:');
console.log('1. Add your problem description');
console.log('2. Update Input and Output types');
console.log('3. Implement your solutions');
console.log('4. Add test cases');
console.log('\nRun your challenge:');
console.log(`npm run day ${nextDay}    # Run the challenge`);
console.log(`npm run test:day ${nextDay}  # Run the tests`);
