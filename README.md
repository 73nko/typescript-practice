# TypeScript Practice

A scaffold for daily TypeScript programming practice with testing and benchmarking capabilities.

## Project Structure

```
src/
  ├── utils/              # Utility functions (benchmarking, etc.)
  ├── day1-example/       # Example problem (Fibonacci)
  │   ├── fibonacci.ts    # Implementation file
  │   └── fibonacci.test.ts # Test file with benchmarks
  └── dayN-*/            # Your daily practice problems
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a new challenge:
   ```bash
   npm run new <challenge-name>  # e.g., npm run new matrix
   ```
   This will create a new directory with the next available day number (e.g., `day2-matrix`) containing:
   - Main implementation file
   - Test file with benchmarks
   - Basic scaffold for multiple solutions
   - TypeScript types and benchmarking setup

3. Run tests:
   ```bash
   npm test          # Run all tests once
   npm run test:watch # Run tests in watch mode
   ```

4. Build the project:
   ```bash
   npm run build          # Build once
   npm run build:watch    # Build in watch mode
   ```

## Running Daily Challenges

You can run challenges in two ways:

1. Run the main implementation:
   ```bash
   npm run day <number>   # Run specific day (e.g., npm run day 1)
   ```
   This will execute the `main()` function of any challenge matching `day<number>-*`

2. Run the tests for a specific day:
   ```bash
   npm run test:day <number>  # Run tests for specific day
   ```

For example, running day 1 (Fibonacci example):
```bash
npm run day 1    # Runs the implementation with benchmarks
npm run test:day 1  # Runs the test suite
```

Each challenge should export a `main()` function that demonstrates the solution and runs benchmarks.

## Creating a New Practice Problem

1. Create a new challenge:
   ```bash
   npm run new <challenge-name>
   ```
   This automatically:
   - Creates a directory with the next day number
   - Sets up implementation and test files
   - Adds TypeScript types and benchmarking boilerplate

2. Navigate to the created directory and:
   - Add your problem description
   - Update Input and Output types
   - Implement your solutions
   - Add test cases

Example implementation structure:
```typescript
import { compareSolutions, Solution } from '../utils/benchmark';

export function solution1(input: InputType): ReturnType {
  // Your first solution
}

export function solution2(input: InputType): ReturnType {
  // Your alternative solution
}

export function main() {
  // Basic demonstration
  console.log('Example with simple input:', solution1(simpleInput));

  // Benchmark different implementations
  const solutions: Solution<InputType, ReturnType>[] = [
    { name: 'Solution 1', fn: solution1 },
    { name: 'Solution 2', fn: solution2 },
  ];

  compareSolutions(testInput, solutions, { verify: true });
}
```

## Using the Benchmark Utility

```typescript
import { compareSolutions, Solution } from '../utils/benchmark';

const solutions: Solution<InputType, ReturnType>[] = [
  { name: 'Solution 1', fn: solution1 },
  { name: 'Solution 2', fn: solution2 },
];

// Compare solutions with input verification
compareSolutions(testInput, solutions, { verify: true });
```

## Best Practices

1. Always create test cases for your solutions
2. Use TypeScript types for better code quality
3. When implementing multiple solutions, use the benchmark utility to compare performance
4. Document your solutions with comments explaining the approach
5. Keep your code clean and well-organized
6. Export a `main()` function in your implementation file to demonstrate usage

## Available Scripts

- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run build`: Build the project
- `npm run build:watch`: Build in watch mode
- `npm run clean`: Remove build artifacts
- `npm run day <number>`: Run specific day's challenge
- `npm run test:day <number>`: Run tests for specific day