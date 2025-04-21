import { solution1, Input } from './word-ladder';

const input: Input = {
  beginWord: 'hit',
  endWord: 'cog',
  wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
};

describe('word-ladder', () => {
  describe('solution1', () => {
    it('should handle basic cases', () => {
      expect(solution1(input)).toBe(5);
    });

    it('should handle edge cases', () => {
      expect(solution1({ ...input, wordList: ['hot', 'dot', 'dog', 'lot', 'log'] })).toBe(0);
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
});
