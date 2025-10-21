# zhyn-v2-frontend

## User Journey

**Problem**: User is an advanced Mandarin foreign language learner. User learned Mandarin in the States but is now studying at a Mandarin Training Center in Taiwan. User would like to switch to using Zhuyin input method, as it is the standard in Taiwan.

**Context**: User is not used to typing Zhuyin, they take a long time to type each word. The user wants to improve speed through typing practice.

**Goal**: The user wants practice typing Zhuyin and receive immediate feedback on whether they typed correctly or not.

**Specific actions:**

**Action 1: User selects "intermediate" level**

User is brought to a Typing Page.

Timer starts for 1 minute (10 second used for development/testing purposes)

**Action 2: User starts typing the characters they see on screen**

User receives feedback when they type incorrectly (character is highlighted red)

**Action 3: Timer runs out**

User is brought to Results Page, telling them their speed, accuracy, and a list of inccorectly types characters, and what the correct Zhuyn representation is

**Outcome**: User was able to practice typing Chinese characters suitable to their level, and receives feedback and metrics on their typing performance. User can repeat this typing practice to drill their typing skills.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
