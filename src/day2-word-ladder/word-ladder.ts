import { compareSolutions, Solution } from '../utils/benchmark';

/**
 * Problem: word-ladder
 *
 * Description:
 *
 * Given two words, beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord, such that:
 * 1. Only one letter can be changed at a time.
 * 2. Each transformed word must exist in the word list.
 */

export type Input = {
  beginWord: string;
  endWord: string;
  wordList: string[];
};
export type Output = number;

const input: Input = {
  beginWord: 'hit',
  endWord: 'cog',
  wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
};

export function solution1({ beginWord, endWord, wordList }: Input): Output {
  // If the end word is not in the word list, return 0
  if (!wordList.includes(endWord)) return 0;

  const L = beginWord.length;
  const adj: Record<string, string[]> = {};

  for (let word of wordList) {
    for (let i = 0; i < L; i++) {
      // Create a pattern for the word by replacing the i-th character with a wildcard
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      // Add the word to the adjacency list for the pattern
      (adj[pattern] ||= []).push(word);
    }
  }

  // Initialize a queue with the begin word and steps
  const queue = [[beginWord, 1]];
  // Initialize a set to keep track of visited words
  const visited = new Set([beginWord]);

  while (queue.length) {
    // Get the next word and steps from the queue
    const [word, steps] = queue.shift() as [string, number];
    // Iterate over the pattern for the word
    for (let i = 0; i < L; i++) {
      // Create a pattern for the word by replacing the i-th character with a wildcard
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      // Iterate over the words in the adjacency list for the pattern
      for (let nei of adj[pattern] || []) {
        // If the word is the end word, return the steps
        if (nei === endWord) return steps + 1;
        // If the word has not been visited, add it to the visited set and queue
        if (!visited.has(nei)) {
          visited.add(nei);
          queue.push([nei, steps + 1]);
        }
      }
    }
  }
  return 0;
}

export function main(): void {
  // Example usage
  const simpleInput: Input = input;
  console.log('Example with simple input:');
  console.log(solution1(simpleInput));

  // Benchmark different implementations
  const solutions: Solution<Input, Output>[] = [{ name: 'Solution 1', fn: solution1 }];

  const benchmarkInput: Input = simpleInput;
  console.log('\nRunning benchmarks...');
  compareSolutions(benchmarkInput, solutions, { verify: true });
}
