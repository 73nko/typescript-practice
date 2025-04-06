import path from 'path';
import fs from 'fs';

// Get the day argument from command line
const dayArg = process.argv[2];
if (!dayArg) {
  console.error('Please provide a day number or pattern (e.g., "2" or "2-*")');
  process.exit(1);
}

// Extract the day number from the argument
const dayMatch = dayArg.match(/^(\d+)/);
if (!dayMatch) {
  console.error(
    'Invalid day format. Use a number or number-* pattern (e.g., "2" or "2-*")'
  );
  process.exit(1);
}

const dayNumber = dayMatch[1];
const srcDir = path.join(process.cwd(), 'src');

// Find matching challenge directories
const challengeDirs = fs
  .readdirSync(srcDir)
  .filter((dir) => dir.startsWith(`day${dayNumber}-`))
  .map((dir) => path.join(srcDir, dir));

if (challengeDirs.length === 0) {
  console.error(`No challenges found for day ${dayNumber}`);
  process.exit(1);
}

// For each matching directory, try to find and run the main file
challengeDirs.forEach((dir) => {
  const files = fs.readdirSync(dir);
  const mainFile = files.find(
    (f) =>
      !f.includes('.test.') &&
      !f.includes('.spec.') &&
      (f.endsWith('.ts') || f.endsWith('.js'))
  );

  if (!mainFile) {
    console.error(`No main file found in ${dir}`);
    return;
  }

  const relativePath = path.relative(process.cwd(), path.join(dir, mainFile));
  console.log(`\nRunning challenge: ${path.basename(dir)}`);
  console.log('='.repeat(50));

  try {
    // Using dynamic import to run the challenge
    import(path.join(dir, mainFile))
      .then((module) => {
        // If there's a main or run function, execute it
        if (typeof module.main === 'function') {
          module.main();
        } else if (typeof module.run === 'function') {
          module.run();
        } else {
          console.log('Module loaded, but no main() or run() function found.');
          console.log('Available exports:', Object.keys(module));
        }
      })
      .catch((err) => {
        console.error(`Error running ${relativePath}:`, err);
      });
  } catch (err) {
    console.error(`Error importing ${relativePath}:`, err);
  }
});
