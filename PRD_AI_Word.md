# PRD: AI-Powered Document Editor (The "Mashine" - Hybrid Familiarity Model)

## 1. The Core Philosophy (Familiarity meets Magic)
We are building the ultimate AI-powered document editor, but we must respect **User Habit**. People are heavily conditioned by MS Word. If we change the UI too much, we introduce a learning curve, which causes friction.
* **The Strategy:** The UI must look and feel *exactly* like MS Word (ribbons, A4 page layout, standard tools) so the user feels instantly at home. However, the *magic* (AI and deterministic formatting) happens seamlessly in the background and within familiar toolbars.

## 2. The Auto-Detect & Verification Flow (Saving Tokens, Zero Hallucinations)
Instead of forcing users to learn markdown (`/h1`) or relying entirely on expensive AI LLM calls for every keystroke, we use a smart, deterministic **Auto-Detection Engine** with a Human-in-the-Loop verification step.

### Step 1: Content Injection & Auto-Detection
When a user pastes or uploads text (e.g., a research paper, a letter), the system's deterministic engine scans it. It uses basic heuristics to map the document:
* "This short line at the top is probably a `Title`."
* "This block of text is a `Paragraph`."
* "This list with numbers is an `Ordered List`."
* "This document has an Abstract and Methodology, it is a `Research Paper`."

### Step 2: The Verification UI (Interactive Ramani)
The system enters a "Verification Mode."
* The UI communicates friendly to the user: *"I've organized your document. Does this look right?"*
* Every block has a visual tag (e.g., `[Heading]`, `[Paragraph]`).
* The user simply clicks a green **"Tick" (✓)** to confirm, or a friendly **"Adjust" (⚙)** button to change a tag (e.g., changing `Paragraph` to `Quote`) using a simple dropdown.
* **No tech skills required.** The interface talks to them like a helpful assistant.
* *Result:* The system now has a mathematically perfect, 100% accurate "Ramani" (Document Map/AST) of the entire text. No AI hallucinations.

### Step 3: Contextual AI Editing (Page-Specific)
Once the map is verified, the user interacts with the standard MS Word-style UI.
* If they want a table on Page 3, they go to Page 3, highlight a section, and tell the AI (via a sidebar or contextual popup): *"Build a table comparing these two paragraphs right here."*
* Because the system has the verified Ramani (Map), it deterministicly executes the command and injects the table into that exact block, shifting the content down perfectly without breaking the layout.

## 3. Style Cloning (Copying Formats via AI)
Users can upload an existing document and say: *"Make my document look exactly like this one."*
* The AI acts as a CSS extractor. It looks at the uploaded document, extracts the font sizes, margins, and heading styles, and updates the deterministic engine's stylesheet.
* The system applies this new style globally to our verified "Ramani." Perfect formatting, zero hallucinations.

## 4. Business & Strategy: CAC, Growth & Monetization
* **CAC (Customer Acquisition Cost):** Low friction. Users switch because it *looks* like Word but *acts* like a super-assistant. The viral loop is triggered when users share perfectly formatted, complex documents (like Research Papers) instantly.
* **Monetization:** Freemium. The familiar MS Word editor and Auto-Detect Engine are free. Advanced AI actions (Style Cloning, auto-generating complex tables from data) consume credits.
