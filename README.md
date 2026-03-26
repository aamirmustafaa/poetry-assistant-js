# Poetry Assistant (Rhyme & Alliteration CLI Tool)

A Node.js command-line poetry assistant that helps poets by suggesting **rhyming words** and **alliterations** using a word list.  
The tool also displays results in a formatted table and exports them to a text file.

---

## Features

- 🔤 Find rhyming words
- 🔁 Find alliterations (same starting sound)
- ⚡ Fast lookup using preprocessed maps
- 📊 Clean terminal table output
- 📁 Automatically exports results to `.txt` file
- 🧠 Smart fallback when no rhymes found

---

## Project Structure

poetry-assistant/
│
├── assistant.js     # Main JavaScript file
├── wordlist.txt     # Word dictionary (one word per line)
├── README.md        # Project documentation

---

## Requirements

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

---

## Installation

1. Clone or download the project
2. Navigate into the project folder

```bash
cd poetry-assistant

	3.	Install dependency
npm install cli-table3

Usage

Run the program:
node assistant.js

You will be prompted:
Choose search type — (r)hyme or (a)lliteration:

Then enter a word:
Enter a word or phrase:

Example
Choose search type — (r)hyme or (a)lliteration: r
Enter a word or phrase: light

Output:
Rhymes ending with: "ight"

#   Rhyme Word
1   night
2   sight
3   bright
4   flight

The results will also be exported to:
rhymes_light.txt

How It Works

Rhyme Detection
	•	Finds last vowel in the word
	•	Extracts suffix
	•	Matches words ending with same suffix
	•	Uses fallback if no match found

Alliteration Detection
	•	Uses first 3 letters of word
	•	Preprocessed into hash map
	•	Fast lookup for matching words

Wordlist Format

The wordlist.txt file should contain one word per line:
cat
bat
hat
light
night
bright

Dependencies
	•	cli-table3￼ — for formatted terminal tables

⸻

Future Improvements
	•	Web interface (HTML + JS)
	•	Phonetic rhyme detection
	•	Auto-suggestion while typing
	•	Larger dictionary support
	•	GUI version

⸻

Author

Aamir Mustafa
Computer Science Student

