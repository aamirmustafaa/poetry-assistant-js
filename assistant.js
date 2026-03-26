// Poetry Assistant with Rhyme and Alliteration Support
// This tool helps poets by suggesting rhyming words and words that start with similar sounds (alliteration)

const fs = require('fs');
const readline = require('readline');
const Table = require('cli-table3'); // Outputs results in clean table format in terminal

// Load and normalize the word list from file
let wordList = fs.readFileSync('wordlist.txt', 'utf-8')
.split('\n')
.map(word => word.trim().toLowerCase())
.filter(word => word.length > 0); // Remove empty entries

// Define vowels for rhyme suffix detection
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

// Preprocess alliteration prefixes into a map for fast access
const alliterationMap = new Map();

wordList.forEach(word => {
  const prefix = word.slice(0, 3); // Use first 3 characters for alliteration
  if (!alliterationMap.has(prefix)) {
    alliterationMap.set(prefix, []);
  }
  alliterationMap.get(prefix).push(word);
});

// Extract possible rhyme suffixes by scanning from the last vowel
function getRhymeSuffixes(word) {
  const suffixes = [];
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) {
      suffixes.push(word.slice(i));
    }
  }
  if (suffixes.length === 0) suffixes.push(word.slice(-2)); // Fallback if no vowel found
  return suffixes;
}

// Finds and displays rhymes based on suffixes
function findRhymes(input) {
  const suffixes = getRhymeSuffixes(input);
  let rhymes = [];

  for (let suffix of suffixes) {
    rhymes = wordList.filter(word =>
      word !== input &&
      word.endsWith(suffix)
    );
    if (rhymes.length >= 3 || suffix.length > 2) {
      displayResults(rhymes, 'rhyme', suffix, input);
      return;
    }
  }

  // Use final fallback: last two letters if no rhyme found earlier
  const fallback = input.slice(-2);
  rhymes = wordList.filter(word =>
    word !== input && word.endsWith(fallback)
  );
  displayResults(rhymes, 'rhyme', fallback, input);
}

// Finds alliteration matches using 3-letter prefix and precomputed map
function findAlliterations(input) {
  const prefix = input.replace(/\s+/g, '').toLowerCase().slice(0, 3);
  const matches = alliterationMap.get(prefix) || [];
  const filtered = matches.filter(word => word !== input);
  displayResults(filtered, 'alliteration', prefix, input);
}

// Displays results in a nice table and writes them to a file
function displayResults(words, type, key, input) {
  const header =
    type === 'rhyme'
      ? `Rhymes ending with: "${key}"`
      : `Words starting with: "${key}"`;

  console.log(`\n${header}\n`);

  if (words.length === 0) {
    console.log(`❌ No ${type}s found.\n`);
    return;
  }

  const table = new Table({
    head: ['#', `${type[0].toUpperCase() + type.slice(1)} Word`],
    colWidths: [5, 30],
    wordWrap: true
  });

  words.sort((a, b) => a.length - b.length); // Sort by word length for cleaner display
  words.forEach((word, index) => {
    table.push([index + 1, word]);
  });

  console.log(table.toString());
  console.log(`✅ Total: ${words.length} ${type}s found.\n`);

  const filename = `${type}s_${input.replace(/\s+/g, '_')}.txt`;
  const content =
    `${header}\n\n` +
    words.map((w, i) => `${i + 1}. ${w}`).join('\n') +
    `\n\n✅ Total: ${words.length} ${type}s`;

  fs.writeFileSync(filename, content);
  console.log(`📁 Exported to: ${filename}\n`);
}

// --- User CLI interaction ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user to choose between rhyme or alliteration
rl.question("🔍 Choose search type — (r)hyme or (a)lliteration: ", function (mode) {
  const choice = mode.trim().toLowerCase();
  if (choice !== 'r' && choice !== 'a') {
    console.log("❌ Invalid choice. Enter 'r' or 'a'.");
    rl.close();
    return;
  }

  // Prompt the user to enter a word or phrase
  rl.question("🔤 Enter a word or phrase: ", function (word) {
    word = word.trim().toLowerCase();
    if (word.length === 0) {
      console.log("❌ Please enter a valid word.");
    } else {
      if (choice === 'r') {
        findRhymes(word);
      } else {
        findAlliterations(word);
      }
    }
    rl.close();
  });
});