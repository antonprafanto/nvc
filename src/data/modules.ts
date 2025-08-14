export interface Lesson {
  id: number
  title: string
  description: string
  content: string
  duration: number // in minutes
  type: 'video' | 'text' | 'interactive'
  videoUrl?: string
  completed?: boolean
}

export interface Quiz {
  id: number
  title: string
  description: string
  questions: QuizQuestion[]
  passingScore: number
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Module {
  id: number
  title: string
  subtitle: string
  description: string
  longDescription: string
  duration: string
  lessons: Lesson[]
  quiz?: Quiz
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan'
  prerequisites: string[]
  learningOutcomes: string[]
  color: string
  icon: string
  estimatedHours: number
  badge?: {
    name: string
    description: string
    icon: string
  }
}

export const moduleData: Module[] = [
  {
    id: 1,
    title: 'Foundations & Mindset',
    subtitle: 'Ngoding Bareng AI',
    description: 'Membangun pola pikir developer dan memahami peran AI dalam coding modern.',
    longDescription: 'Modul pertama ini akan memperkenalkan Anda pada dunia programming dan bagaimana AI dapat menjadi partner terbaik dalam journey coding Anda. Anda akan belajar mindset yang tepat, tools yang dibutuhkan, dan cara memanfaatkan AI untuk mempercepat pembelajaran.',
    duration: '2 minggu',
    difficulty: 'Pemula',
    estimatedHours: 16,
    color: 'from-blue-500 to-blue-600',
    icon: 'Brain',
    prerequisites: [],
    learningOutcomes: [
      'Memahami konsep dasar programming dan web development',
      'Mengenal berbagai bahasa pemrograman dan use case-nya',
      'Mampu menggunakan AI assistant untuk coding',
      'Membangun mindset growth dan problem-solving',
      'Mengenal ecosystem development modern'
    ],
    lessons: [
      {
        id: 1,
        title: 'Pengenalan Dunia Programming',
        description: 'Apa itu programming dan kenapa penting di era digital',
        content: `# Pengenalan Dunia Programming

## Apa itu Programming?

Programming atau pemrograman adalah proses membuat instruksi untuk komputer agar dapat menjalankan tugas tertentu. Bayangkan Anda sedang mengajar seseorang yang sangat literal dan detail - itulah programming!

## Mengapa Belajar Programming?

### 1. **Peluang Karir yang Luas**
- Web Developer
- Mobile App Developer  
- Data Scientist
- AI/ML Engineer
- DevOps Engineer

### 2. **Gaji yang Kompetitif**
Developer di Indonesia rata-rata mendapat gaji 8-15 juta untuk fresh graduate, dan bisa mencapai 50+ juta untuk senior level.

### 3. **Fleksibilitas Kerja**
- Remote work friendly
- Freelance opportunities
- Build your own product

## Bahasa Pemrograman Populer

### JavaScript
Bahasa paling populer untuk web development. Bisa digunakan untuk frontend dan backend.

### Python  
Mudah dipelajari, populer untuk data science, AI, dan automation.

### Java
Enterprise-grade, banyak digunakan di perusahaan besar.

## Yang Akan Kita Pelajari

Dalam modul ini, kita akan fokus pada:
- Mindset developer
- Problem solving skills
- Collaboration dengan AI
- Tools dan workflow modern

Mari mulai journey coding Anda!`,
        duration: 45,
        type: 'text'
      },
      {
        id: 2,
        title: 'Mindset Developer yang Sukses',
        description: 'Membangun mental model yang tepat untuk belajar coding',
        content: `# Mindset Developer yang Sukses

## Growth Mindset vs Fixed Mindset

### Growth Mindset ✅
- "Saya belum bisa... **untuk sekarang**"
- Melihat error sebagai pembelajaran
- Terus belajar dan adapt dengan teknologi baru
- Collaboration over competition

### Fixed Mindset ❌
- "Saya tidak berbakat coding"
- Takut mencoba hal baru
- Menyerah saat menghadapi error
- Merasa terancam dengan progress orang lain

## Prinsip Belajar Efektif

### 1. **Learning by Doing**
Jangan hanya baca teori, langsung praktik!

### 2. **Embrace the Error**
Error adalah guru terbaik. Jangan frustasi, tapi curious.

### 3. **Build in Public**
Share progress Anda, minta feedback, dan belajar dari community.

### 4. **Consistency Over Intensity**
Lebih baik 1 jam setiap hari daripada 7 jam sekali seminggu.

## Problem Solving Framework

### 1. **Understand the Problem**
- Baca requirement dengan teliti
- Identifikasi input dan expected output
- Break down menjadi sub-problems

### 2. **Plan Your Approach**
- Pseudocode atau flowchart
- Identifikasi tools/libraries yang dibutuhkan
- Estimasi complexity

### 3. **Implement Solution**
- Start with simplest version
- Test incrementally
- Refactor for better code quality

### 4. **Review and Optimize**
- Code review
- Performance optimization
- Documentation

## Dealing with Imposter Syndrome

Hampir semua developer pernah merasa "tidak layak" atau "tidak cukup pintar". Ini normal!

**Tips mengatasinya:**
- Focus on progress, not perfection
- Celebrate small wins
- Connect with community
- Remember: everyone started from zero

## Next Steps

Di lesson berikutnya, kita akan explore bagaimana AI bisa menjadi coding partner terbaik Anda!`,
        duration: 60,
        type: 'text'
      },
      {
        id: 3,
        title: 'Berkenalan dengan AI Coding Assistant',
        description: 'Memahami berbagai AI tools untuk coding dan cara menggunakannya',
        content: `# Berkenalan dengan AI Coding Assistant

## Apa itu AI Coding Assistant?

AI Coding Assistant adalah tools yang menggunakan artificial intelligence untuk membantu developer dalam proses coding. Mereka bisa:
- Generate code berdasarkan description
- Explain existing code
- Debug dan fix errors
- Suggest improvements
- Write documentation

## Popular AI Coding Tools

### 1. **GitHub Copilot**
- Terintegrasi dengan VS Code
- Real-time code suggestions
- Context-aware completions

### 2. **ChatGPT/Claude**
- Conversation-based coding help
- Code explanation dan debugging
- Algorithm discussion

### 3. **Tabnine**
- AI code completion
- Support multiple languages
- Local and cloud options

### 4. **Replit Ghostwriter**
- Built-in di Replit IDE
- Code generation dan explanation
- Collaborative coding

## Cara Efektif Menggunakan AI Assistant

### Do's ✅
- **Be Specific**: Jelaskan requirement dengan detail
- **Provide Context**: Berikan informasi tech stack dan constraints
- **Iterate**: Improve prompt berdasarkan output
- **Verify**: Always review dan understand generated code

### Don'ts ❌
- **Blind Copy-Paste**: Selalu understand code yang di-generate
- **Over-Reliance**: Jangan sampai tidak bisa coding tanpa AI
- **Ignore Best Practices**: AI tidak selalu generate best practices
- **Skip Testing**: AI-generated code tetap perlu testing

## Example: Effective AI Prompting

### Bad Prompt ❌
"Buat function untuk sort array"

### Good Prompt ✅
"Buat function JavaScript untuk sort array of objects berdasarkan property 'name' secara ascending. Handle edge cases untuk empty array dan invalid input. Gunakan modern ES6+ syntax."

## Hands-on: Your First AI Collaboration

Mari coba gunakan AI assistant untuk membuat simple calculator:

**Prompt yang bisa Anda coba:**
"Buat simple calculator function dalam JavaScript yang bisa handle basic operations (tambah, kurang, kali, bagi). Include error handling untuk division by zero dan invalid inputs. Gunakan modern JavaScript syntax."

## Best Practices for AI Collaboration

### 1. **Start Simple**
Begin with basic requirements, then iterate

### 2. **Ask for Explanations**
"Explain this code step by step"

### 3. **Request Alternatives**
"Show me 3 different ways to solve this"

### 4. **Seek Improvements**
"How can I optimize this code?"

### 5. **Learn from Examples**
"Show me example usage of this function"

## Common AI Limitations

### What AI is Great At:
- Code generation for common patterns
- Debugging syntax errors
- Explaining complex code
- Suggesting optimizations

### What AI Struggles With:
- Complex business logic
- Architecture decisions
- Performance-critical code
- Security-sensitive implementations

## Building Your AI Workflow

### Daily Routine:
1. **Planning Phase**: Discuss approach with AI
2. **Implementation**: Use AI for code generation
3. **Review Phase**: Ask AI to review your code
4. **Learning**: Ask AI to explain new concepts

Remember: AI is your coding partner, not replacement for learning fundamentals!`,
        duration: 75,
        type: 'interactive'
      },
      {
        id: 4,
        title: 'Setup Development Environment',
        description: 'Menginstall dan konfigurasi tools yang dibutuhkan untuk coding',
        content: `# Setup Development Environment

## Essential Tools untuk Developer

### 1. **Code Editor: Visual Studio Code**

VS Code adalah editor paling populer di kalangan developer karena:
- Free dan open source
- Extensible dengan thousands of extensions
- Integrated terminal
- Git integration
- AI assistant support

**Download:** https://code.visualstudio.com/

### 2. **Version Control: Git & GitHub**

Git adalah version control system yang wajib dikuasai developer.

**Install Git:**
- Windows: Download dari git-scm.com
- Mac: brew install git
- Linux: sudo apt install git

**Setup GitHub Account:**
1. Sign up di github.com
2. Generate SSH keys untuk secure access
3. Configure git username dan email

### 3. **Package Manager: Node.js & npm**

Node.js diperlukan untuk JavaScript development.

**Download:** https://nodejs.org/
- Pilih LTS version
- npm akan ter-install otomatis

### 4. **Browser Developer Tools**

Semua modern browsers punya developer tools yang powerful:
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

## VS Code Extensions Recommendations

### Must-Have Extensions:

1. **GitHub Copilot** - AI coding assistant
2. **Prettier** - Code formatter
3. **ESLint** - JavaScript linter
4. **Live Server** - Local development server
5. **Auto Rename Tag** - HTML tag helper
6. **Bracket Pair Colorizer** - Visual bracket matching
7. **GitLens** - Enhanced Git capabilities
8. **Thunder Client** - API testing

### Language-Specific Extensions:

- **ES7+ React/Redux/React-Native snippets**
- **Python** - Python support
- **Tailwind CSS IntelliSense**
- **PHP IntelliSense**

## Terminal/Command Line Basics

### Essential Commands:

**Navigation:**
\`\`\`bash
pwd              # Print working directory
ls               # List files (Mac/Linux)
dir              # List files (Windows)
cd folder_name   # Change directory
cd ..            # Go up one level
\`\`\`

**File Operations:**
\`\`\`bash
mkdir project    # Create directory
touch file.txt   # Create empty file (Mac/Linux)
echo. > file.txt # Create empty file (Windows)
rm file.txt      # Delete file
\`\`\`

**Git Commands:**
\`\`\`bash
git init         # Initialize repository
git add .        # Stage all changes
git commit -m "message"  # Commit changes
git push         # Push to remote
git pull         # Pull from remote
\`\`\`

## Setting Up Your First Project

### Step 1: Create Project Directory
\`\`\`bash
mkdir my-first-project
cd my-first-project
\`\`\`

### Step 2: Initialize Git
\`\`\`bash
git init
\`\`\`

### Step 3: Create Basic Files
\`\`\`bash
touch index.html
touch style.css
touch script.js
\`\`\`

### Step 4: Open in VS Code
\`\`\`bash
code .
\`\`\`

## Browser Developer Tools

### Chrome DevTools Features:
1. **Elements Tab** - Inspect and modify HTML/CSS
2. **Console Tab** - JavaScript debugging
3. **Sources Tab** - Debug JavaScript dengan breakpoints
4. **Network Tab** - Monitor network requests
5. **Performance Tab** - Analyze performance issues

### Useful Shortcuts:
- **F12** - Open DevTools
- **Ctrl+Shift+I** - Open DevTools
- **Ctrl+Shift+C** - Inspect element mode

## Productivity Tips

### VS Code Shortcuts:
- **Ctrl+P** - Quick file search
- **Ctrl+Shift+P** - Command palette
- **Ctrl+\`** - Toggle terminal
- **Alt+Up/Down** - Move line up/down
- **Ctrl+D** - Select next occurrence

### Multiple Cursors:
- **Alt+Click** - Add cursor
- **Ctrl+Alt+Up/Down** - Add cursor above/below
- **Ctrl+Shift+L** - Select all occurrences

## Troubleshooting Common Issues

### 1. **VS Code not recognizing Git**
Solution: Restart VS Code after installing Git

### 2. **npm command not found**
Solution: Restart terminal/computer after Node.js installation

### 3. **Permission errors (Mac/Linux)**
Solution: Use sudo for global installations
\`\`\`bash
sudo npm install -g package-name
\`\`\`

### 4. **Extensions not working**
Solution: Reload VS Code window (Ctrl+Shift+P > "Reload Window")

## Next Steps

Sekarang environment Anda sudah ready! Di lesson berikutnya, kita akan mulai hands-on coding pertama.

**Assignment:**
1. Install semua tools yang disebutkan
2. Create GitHub account dan first repository
3. Install minimal 5 VS Code extensions dari list
4. Practice terminal commands
5. Explore Chrome DevTools di website favorit Anda

Happy coding! 🚀`,
        duration: 90,
        type: 'text'
      }
    ],
    quiz: {
      id: 1,
      title: 'Quiz: Foundations & Mindset',
      description: 'Test pemahaman Anda tentang basic programming concepts dan AI collaboration',
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: 'Apa yang dimaksud dengan Growth Mindset dalam context belajar programming?',
          options: [
            'Percaya bahwa skill coding sudah fixed dari lahir',
            'Melihat error sebagai kegagalan yang harus dihindari',
            'Percaya bahwa kemampuan bisa dikembangkan melalui effort dan pembelajaran',
            'Tidak perlu belajar hal baru karena sudah expert'
          ],
          correctAnswer: 2,
          explanation: 'Growth mindset adalah keyakinan bahwa kemampuan dan intelligence bisa dikembangkan melalui dedikasi, hard work, dan pembelajaran dari feedback.'
        },
        {
          id: 2,
          question: 'Manakah yang bukan termasuk best practice dalam menggunakan AI coding assistant?',
          options: [
            'Memberikan context yang jelas dalam prompt',
            'Copy-paste code tanpa memahami cara kerjanya',
            'Meminta explanation untuk code yang di-generate',
            'Iterasi dan improve prompt berdasarkan hasil'
          ],
          correctAnswer: 1,
          explanation: 'Copy-paste tanpa understanding adalah anti-pattern yang berbahaya. Selalu pahami code yang di-generate AI sebelum menggunakannya.'
        },
        {
          id: 3,
          question: 'Apa keuntungan utama menggunakan VS Code sebagai code editor?',
          options: [
            'Hanya bisa digunakan untuk JavaScript',
            'Tidak membutuhkan internet connection',
            'Memiliki ecosystem extensions yang kaya dan AI integration',
            'Hanya tersedia untuk Windows'
          ],
          correctAnswer: 2,
          explanation: 'VS Code populer karena ecosystem extensions yang sangat kaya, multi-platform, dan support untuk AI assistants seperti GitHub Copilot.'
        }
      ]
    },
    badge: {
      name: 'Foundation Explorer',
      description: 'Menyelesaikan modul dasar programming dan AI collaboration',
      icon: '🎯'
    }
  },
  {
    id: 2,
    title: 'Prompting & AI Collaboration',
    subtitle: 'Berkomunikasi dengan AI',
    description: 'Teknik prompting efektif dan kolaborasi optimal dengan AI coding assistant.',
    longDescription: 'Modul ini akan mengajarkan Anda cara berkomunikasi efektif dengan AI untuk coding. Anda akan belajar teknik prompting yang powerful, cara debugging dengan AI, dan strategi collaboration yang akan meningkatkan produktivitas coding Anda secara dramatis.',
    duration: '1 minggu',
    difficulty: 'Pemula',
    estimatedHours: 8,
    color: 'from-green-500 to-green-600',
    icon: 'MessageSquare',
    prerequisites: ['Modul 1: Foundations & Mindset'],
    learningOutcomes: [
      'Menguasai teknik prompting untuk berbagai kebutuhan coding',
      'Mampu debugging efektif dengan bantuan AI',
      'Memahami limitation dan strength AI dalam coding',
      'Mengoptimalkan workflow development dengan AI collaboration'
    ],
    lessons: [
      {
        id: 1,
        title: 'Prompting Fundamentals',
        description: 'Dasar-dasar berkomunikasi efektif dengan AI untuk coding',
        content: `# Prompting Fundamentals untuk Coding

## Apa itu Effective Prompting?

Effective prompting adalah seni berkomunikasi dengan AI untuk mendapatkan output yang akurat, relevant, dan useful. Dalam context coding, ini berarti mampu menjelaskan requirement dengan cara yang AI bisa understand dan deliver code yang berkualitas.

## Anatomy of Good Prompt

### 1. **Context (Konteks)**
Berikan informasi background yang relevan:
- Tech stack yang digunakan
- Constraints atau limitations
- Target audience atau use case

### 2. **Task (Tugas)**
Jelaskan secara spesifik apa yang ingin dicapai:
- Function atau feature yang dibutuhkan
- Input dan expected output
- Behavior yang diinginkan

### 3. **Format (Format)**
Spesifikasi format output yang diinginkan:
- Bahasa programming
- Code style atau conventions
- Documentation level

### 4. **Examples (Contoh)**
Berikan contoh input/output jika memungkinkan:
- Sample data
- Expected results
- Edge cases

## Prompt Structure Framework

### Basic Structure:
\`\`\`
[CONTEXT] + [TASK] + [FORMAT] + [CONSTRAINTS]
\`\`\`

### Example:
**Bad Prompt:**
"Buat function sort"

**Good Prompt:**
"Saya sedang membuat e-commerce website dengan React dan TypeScript. Buat function untuk sort array of product objects berdasarkan berbagai criteria (price, name, rating). Function harus:
- Accept array of products dan sort criteria
- Return sorted array tanpa mutating original
- Handle edge cases (empty array, invalid criteria)
- Gunakan TypeScript dengan proper typing
- Include JSDoc comments"

## Types of Coding Prompts

### 1. **Code Generation**
Generate new code from scratch.

**Template:**
"Create a [LANGUAGE] [FUNCTION/CLASS/COMPONENT] that [FUNCTIONALITY]. Requirements: [LIST]. Use [STYLE/PATTERN]."

**Example:**
"Create a JavaScript class that manages a shopping cart. Requirements: add items, remove items, calculate total, apply discounts. Use ES6+ syntax and include error handling."

### 2. **Code Explanation**
Understand existing code.

**Template:**
"Explain this [LANGUAGE] code step by step: [CODE]. Focus on [SPECIFIC_ASPECT]."

**Example:**
"Explain this React useEffect hook step by step: [paste code]. Focus on the dependency array and cleanup function."

### 3. **Code Review & Improvement**
Get feedback on existing code.

**Template:**
"Review this [LANGUAGE] code for [CRITERIA]. Suggest improvements: [CODE]"

**Example:**
"Review this JavaScript function for performance and readability. Suggest improvements: [paste code]"

### 4. **Debugging**
Fix errors or issues.

**Template:**
"I'm getting [ERROR_MESSAGE] in this [LANGUAGE] code: [CODE]. The expected behavior is [EXPECTED]. Help me debug this."

**Example:**
"I'm getting 'Cannot read property of undefined' in this React component: [paste code]. The expected behavior is to display user profile. Help me debug this."

## Advanced Prompting Techniques

### 1. **Chain of Thought Prompting**
Ask AI to think step by step.

"Let's think step by step. I need to build a user authentication system. First, analyze what components are needed, then design the architecture, and finally provide the implementation."

### 2. **Role-Based Prompting**
Ask AI to take specific role or perspective.

"Act as a senior React developer reviewing this code. What improvements would you suggest for performance and maintainability?"

### 3. **Constraint-Based Prompting**
Provide specific limitations.

"Create a sorting algorithm that must:
- Use only built-in JavaScript methods
- Handle arrays up to 10,000 elements
- Maintain original order for equal elements (stable sort)
- Include time complexity analysis"

### 4. **Iterative Refinement**
Build upon previous responses.

First prompt: "Create a basic todo app in React"
Follow-up: "Add drag and drop functionality to reorder todos"
Follow-up: "Add local storage persistence"

## Common Prompting Mistakes

### 1. **Too Vague**
❌ "Fix my React app"
✅ "My React component is not re-rendering when state changes. Here's the code: [code]"

### 2. **No Context**
❌ "Optimize this function"
✅ "Optimize this function that runs 1000+ times per second in a real-time game: [code]"

### 3. **Overwhelming Details**
❌ [500 lines of code with no specific question]
✅ [Relevant code snippet with specific issue highlighted]

### 4. **Single Shot Approach**
❌ Expecting perfect result in one prompt
✅ Iterating and refining through conversation

## Language-Specific Prompting Tips

### JavaScript/TypeScript:
- Specify ES version (ES6+, ES2022, etc.)
- Mention if you need browser/Node.js compatibility
- Ask for TypeScript types when relevant

### React:
- Specify functional vs class components
- Mention hooks usage
- State management approach (useState, useReducer, etc.)

### Python:
- Specify Python version
- Mention if you need specific libraries
- PEP 8 compliance requirements

### CSS:
- Specify if you use frameworks (Tailwind, Bootstrap)
- Browser compatibility requirements
- Responsive design needs

## Hands-on Exercise

Try improving these prompts:

**Exercise 1:**
Bad: "Make a button"
Your improvement: ___________

**Exercise 2:**
Bad: "API call function"
Your improvement: ___________

**Exercise 3:**
Bad: "Form validation"
Your improvement: ___________

## Best Practices Summary

1. **Be Specific**: Include exact requirements and constraints
2. **Provide Context**: Share relevant background information
3. **Request Explanations**: Ask "explain how this works"
4. **Iterate**: Build upon responses to refine output
5. **Test and Verify**: Always test AI-generated code
6. **Learn from Output**: Use AI responses as learning opportunities

Next lesson: Advanced prompting strategies for complex coding scenarios!`,
        duration: 60,
        type: 'interactive'
      }
    ],
    badge: {
      name: 'AI Whisperer',
      description: 'Menguasai seni komunikasi dengan AI untuk coding',
      icon: '🤖'
    }
  },
  {
    id: 3,
    title: 'Building the Product',
    subtitle: 'Frontend & Backend',
    description: 'Membangun aplikasi web lengkap dari frontend hingga backend.',
    longDescription: 'Modul ini adalah hands-on intensive untuk membangun aplikasi web full-stack. Anda akan belajar React untuk frontend, Node.js untuk backend, database integration, dan cara menghubungkan semuanya menjadi produk yang functional.',
    duration: '4 minggu',
    difficulty: 'Menengah',
    estimatedHours: 40,
    color: 'from-purple-500 to-purple-600',
    icon: 'Code',
    prerequisites: ['Modul 1: Foundations & Mindset', 'Modul 2: Prompting & AI Collaboration'],
    learningOutcomes: [
      'Membangun frontend modern dengan React dan TypeScript',
      'Mengembangkan RESTful API dengan Node.js dan Express',
      'Integrasi database dengan Prisma ORM',
      'Implementasi authentication dan authorization',
      'Deploy aplikasi full-stack ke cloud platform'
    ],
    lessons: [
      {
        id: 1,
        title: 'React Fundamentals',
        description: 'Memahami konsep dasar React untuk membangun UI yang interaktif',
        content: `# React Fundamentals

## Apa itu React?

React adalah JavaScript library untuk membangun user interface (UI). Dikembangkan oleh Facebook, React memungkinkan kita membuat aplikasi web yang fast, scalable, dan simple dengan konsep component-based architecture.

## Mengapa React?

### 1. **Component-Based Architecture**
- Reusable components
- Easier maintenance
- Better organization

### 2. **Virtual DOM**
- Efficient updates
- Better performance
- Smoother user experience

### 3. **Rich Ecosystem**
- Huge community
- Banyak libraries pendukung
- Excellent tooling

### 4. **Industry Standard**
- Digunakan oleh Facebook, Netflix, Airbnb
- High demand di job market
- Future-proof technology

## Setting Up React Project

### Method 1: Create React App
\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

### Method 2: Vite (Recommended)
\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
\`\`\`

## JSX Fundamentals

JSX adalah syntax extension untuk JavaScript yang memungkinkan kita menulis HTML-like code dalam JavaScript.

### Basic JSX:
\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

### JSX Rules:
1. **Return single element** (atau Fragment)
2. **Close all tags**
3. **Use camelCase untuk attributes**
4. **Use className instead of class**

### JavaScript dalam JSX:
\`\`\`jsx
function Greeting({ name }) {
  const message = "Welcome to React!";
  
  return (
    <div className="greeting">
      <h1>{message}</h1>
      <p>Hello, {name}!</p>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </div>
  );
}
\`\`\`

## Components

### Functional Components:
\`\`\`jsx
// Basic functional component
function Button() {
  return <button>Click me</button>;
}

// Component with props
function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
}

// Arrow function component
const Button = ({ text, onClick }) => (
  <button onClick={onClick} className="btn">
    {text}
  </button>
);
\`\`\`

### Props (Properties):
Props adalah cara passing data dari parent ke child component.

\`\`\`jsx
// Parent component
function App() {
  return (
    <div>
      <UserProfile 
        name="John Doe" 
        age={25} 
        isOnline={true}
      />
    </div>
  );
}

// Child component
function UserProfile({ name, age, isOnline }) {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}
\`\`\`

## State Management dengan useState

State adalah data yang bisa berubah dalam component.

### Basic useState:
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
\`\`\`

### Complex State:
\`\`\`jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div className="todo-app">
      <div className="todo-input">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={todo.completed ? 'completed' : ''}
          >
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Event Handling

### Basic Events:
\`\`\`jsx
function EventExamples() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const handleInputChange = (event) => {
    console.log('Input value:', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## Conditional Rendering

### If-Else dengan Ternary:
\`\`\`jsx
function WelcomeMessage({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}
\`\`\`

### Logical AND:
\`\`\`jsx
function Notifications({ notifications }) {
  return (
    <div>
      {notifications.length > 0 && (
        <div className="notification-badge">
          {notifications.length}
        </div>
      )}
    </div>
  );
}
\`\`\`

## Lists dan Keys

### Rendering Lists:
\`\`\`jsx
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

**Important:** Selalu gunakan unique key untuk list items!

## useEffect Hook

useEffect digunakan untuk side effects seperti API calls, subscriptions, atau manual DOM manipulation.

### Basic useEffect:
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Effect function
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### useEffect Patterns:

**Run once (componentDidMount):**
\`\`\`jsx
useEffect(() => {
  // Runs once after first render
}, []);
\`\`\`

**Run on every render:**
\`\`\`jsx
useEffect(() => {
  // Runs after every render
});
\`\`\`

**Run when specific values change:**
\`\`\`jsx
useEffect(() => {
  // Runs when count or name changes
}, [count, name]);
\`\`\`

**Cleanup function:**
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

## Project: Simple Weather App

Mari build simple weather app untuk practice:

\`\`\`jsx
import { useState, useEffect } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Using a weather API (example)
      const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_API_KEY&units=metric\`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <div>Loading...</div>}
      
      {weather && !loading && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
\`\`\`

## Best Practices

### 1. **Component Organization**
- One component per file
- Clear naming conventions
- Group related components

### 2. **State Management**
- Keep state as simple as possible
- Lift state up when needed
- Use custom hooks for complex logic

### 3. **Performance**
- Use React.memo for expensive components
- Optimize re-renders dengan useCallback/useMemo
- Avoid creating objects in render

### 4. **Code Quality**
- Use TypeScript untuk better type safety
- Write meaningful prop types
- Add error boundaries

## Next Steps

Di lesson berikutnya, kita akan learn:
- Advanced React patterns
- Custom hooks
- Context API untuk global state
- Integration dengan backend APIs

Keep practicing dan build more components! 🚀`,
        duration: 120,
        type: 'interactive'
      }
    ],
    badge: {
      name: 'Full-Stack Builder',
      description: 'Membangun aplikasi web lengkap dari frontend hingga backend',
      icon: '🏗️'
    }
  },
  {
    id: 4,
    title: 'Infrastructure & Security',
    subtitle: 'Deploy & Secure',
    description: 'Deployment, keamanan, dan infrastruktur aplikasi di production.',
    longDescription: 'Modul ini membahas aspek deployment dan security yang crucial untuk aplikasi production. Anda akan belajar Docker, CI/CD, cloud deployment, monitoring, dan security best practices.',
    duration: '2 minggu',
    difficulty: 'Menengah',
    estimatedHours: 20,
    color: 'from-red-500 to-red-600',
    icon: 'Shield',
    prerequisites: ['Modul 3: Building the Product'],
    learningOutcomes: [
      'Deploy aplikasi ke cloud platform (Vercel, Netlify, AWS)',
      'Implementasi security best practices',
      'Setup monitoring dan logging',
      'Konfigurasi CI/CD pipeline',
      'Optimasi performance untuk production'
    ],
    lessons: [],
    badge: {
      name: 'DevOps Hero',
      description: 'Menguasai deployment dan security aplikasi production',
      icon: '🛡️'
    }
  },
  {
    id: 5,
    title: 'Optimization & Tracking',
    subtitle: 'Performance & Analytics',
    description: 'Optimasi performa dan implementasi tracking untuk analytics.',
    longDescription: 'Modul ini fokus pada optimization untuk performa aplikasi dan implementasi analytics untuk tracking user behavior. Anda akan belajar teknik optimization, analytics tools, dan data-driven development.',
    duration: '2 minggu',
    difficulty: 'Lanjutan',
    estimatedHours: 20,
    color: 'from-orange-500 to-orange-600',
    icon: 'TrendingUp',
    prerequisites: ['Modul 4: Infrastructure & Security'],
    learningOutcomes: [
      'Optimasi performa frontend dan backend',
      'Implementasi Google Analytics dan event tracking',
      'A/B testing dan experimentation',
      'Monitoring performance metrics',
      'Data analysis untuk product improvement'
    ],
    lessons: [],
    badge: {
      name: 'Performance Guru',
      description: 'Mengoptimalkan aplikasi untuk performa maksimal',
      icon: '⚡'
    }
  },
  {
    id: 6,
    title: 'Monetization & Growth',
    subtitle: 'Scaling Business',
    description: 'Strategi monetisasi dan pertumbuhan produk digital.',
    longDescription: 'Modul terakhir ini membahas aspek business dari produk digital. Anda akan belajar strategi monetization, growth hacking, product management, dan cara scaling bisnis digital.',
    duration: '2 minggu',
    difficulty: 'Lanjutan',
    estimatedHours: 20,
    color: 'from-indigo-500 to-indigo-600',
    icon: 'DollarSign',
    prerequisites: ['Modul 5: Optimization & Tracking'],
    learningOutcomes: [
      'Strategi monetization untuk produk digital',
      'Growth hacking techniques',
      'Product management fundamentals',
      'Scaling architecture dan business',
      'Building sustainable digital business'
    ],
    lessons: [],
    badge: {
      name: 'Business Builder',
      description: 'Membangun dan mengembangkan bisnis digital yang sukses',
      icon: '💰'
    }
  }
]