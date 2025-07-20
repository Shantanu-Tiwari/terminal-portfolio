interface Project {
  name: string;
  title: string;
  description: string;
  stack: string;
  demo?: string;
  github?: string;
  status: 'completed' | 'in-progress' | 'planning';
}

const projects: Project[] = [
  {
    name: 'api-nexus',
    title: 'API Nexus - Postman-like API Testing Workspace',
    description: 'A Postman-grade API testing workspace with instant, tabbed interface. Features environment switching, variable management, and auto-completion. Built for developers who need fast, local API testing without login requirements.',
    stack: 'Next.js, TypeScript, Tailwind CSS',
    demo: 'https://api-nexus-landing.vercel.app/',
    github: 'https://github.com/Shantanu-Tiwari',
    status: 'completed'
  },
  {
    name: 'evo-scan',
    title: 'EvoScan - Pathogenic Variant Prediction',
    description: 'Deep learning-based tool for pathogenic variant prediction using Evo2 deep learning model. Integrates real-time gene and variant data from UCSC Genome Browser and NCBI ClinVar APIs for genetic mutation analysis.',
    stack: 'Python, FastAPI, Next.js, TailwindCSS, Modal, Evo2 Model',
    demo: 'https://evo-scan.vercel.app/',
    github: 'https://github.com/Shantanu-Tiwari',
    status: 'completed'
  },
  {
    name: 'portfolio',
    title: 'Portfolio Website - Showcase Frontend',
    description: 'Personal portfolio website demonstrating frontend development skills, responsive design, and modern web technologies. Features smooth animations and responsive layout.',
    stack: 'React, Next.js, JavaScript, HTML, CSS',
    demo: 'https://portfolio-okul.vercel.app/',
    github: 'https://github.com/Shantanu-Tiwari',
    status: 'completed'
  },
  {
    name: 'code-craft',
    title: 'Code Craft - Online Multi-language Editor',
    description: 'Interactive online code editor and compiler supporting multiple programming languages. Features real-time code compilation, syntax highlighting, and sharing capabilities.',
    stack: 'Next.js, TailwindCSS, Monaco Editor',
    demo: 'https://code-craft-umber.vercel.app/',
    github: 'https://github.com/Shantanu-Tiwari',
    status: 'completed'
  }
];

const createLink = (url: string, text: string, external: boolean = true): string => {
  const target = external ? 'target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${url}" class="terminal-link" ${target}>${text}</a>`;
};

export const commandParser = (
  command: string, 
  availableCommands: string[] = [], 
  setHistory?: React.Dispatch<React.SetStateAction<any[]>>
): string => {
  const [cmd, ...args] = command.toLowerCase().trim().split(' ');
  
  switch (cmd) {
    case 'help':
      if (availableCommands.length > 0) {
        return `Available completions: ${availableCommands.join(', ')}`;
      }
      return `Available commands:
help          - Shows this list of commands
about         - Displays a short bio  
whoami        - Alias for 'about'
skills        - Lists my technical skills
projects      - Shows my recent work
  projects view <name> - View details of a specific project
contact       - Displays my contact information
resume        - Provides a link to my resume
clear         - Clears the terminal screen
date          - Shows current date and time

Easter eggs: Try 'sudo', 'ls', 'pwd', 'cat', or any invalid command!`;

    case 'about':
    case 'whoami':
      return `> ${cmd}

Hey there! I'm Shantanu Tiwari, a full-stack developer based in Noida, India.
I build beautiful, high-performance web applications from the ground up.
Currently pursuing Bachelor of Science in Computer Science (specializing in Data Science)
at JSS Academy of Technical Education.

I'm passionate about bridging ideas and technology, turning complex problems into 
elegant, user-friendly digital experiences. Currently working as a Full Stack 
Developer Intern at Ascendix IT, where I leverage cutting-edge technologies 
to create innovative solutions.

I believe in clean code, continuous learning, and the power of great UX
to make technology accessible to everyone.`;

    case 'skills':
      return `> skills

Languages:      Python, Java, C, JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
Frontend:       React, Next.js, Tailwind CSS, ShadCN UI, FastAPI, Express.js, JaaFX
Backend:        Node.js, Express, FastAPI, Django
Databases:      PostgreSQL, Firebase, MongoDB
Cloud & DevOps: Google Cloud Platform, AWS, Vercel, Docker, Jenkins, Modal
Tools/Platforms: Git, GitHub, Docker, Jenkins, Modal, Vercel, Postman, Figma, Livebooks
Frameworks/Libraries: React, Next.js, Tailwind CSS, ShadCN UI, FastAPI, Express.js
Currently Learning: Deep Learning, Genomics, Advanced Data Science`;

    case 'projects':
      if (args.length === 0) {
        return `> projects

Here are my featured projects.
To see details, type 'projects view <project-name>'.

Featured Projects:
${projects.map(p => `- ${p.name} (${p.status})`).join('\n')}

Example: projects view api-nexus`;
      }
      
      if (args[0] === 'view' && args[1]) {
        const project = projects.find(p => p.name === args[1]);
        if (project) {
          const demoLink = project.demo ? createLink(project.demo, '[Live Demo]') : '';
          const githubLink = project.github ? createLink(project.github, '[GitHub]') : '';
          const links = [demoLink, githubLink].filter(Boolean).join('  ');
          
          return `> projects view ${project.name}

Title:       ${project.title}
Description: ${project.description}
Stack:       ${project.stack}
Status:      ${project.status}
Links:       ${links}`;
        } else {
          return `Project '${args[1]}' not found. Use 'projects' to see available projects.`;
        }
      }
      
      return `Usage: projects [view <project-name>]
Use 'projects' to list all projects.`;

    case 'contact':
      return `> contact

You can reach me via:

Email:      ${createLink('mailto:shantanutiwari2024@gmail.com', 'shantanutiwari2024@gmail.com')}
LinkedIn:   ${createLink('https://linkedin.com/in/shantanutiwari24', 'linkedin.com/in/shantanutiwari24')}
GitHub:     ${createLink('https://github.com/Shantanu-Tiwari', 'github.com/Shantanu-Tiwari')}
Portfolio:  ${createLink('https://portfolio-okul.vercel.app/', 'portfolio-okul.vercel.app')}

Feel free to reach out for collaboration opportunities, 
technical discussions, or just to say hello!`;

    case 'resume':
      // Simulate opening resume
      setTimeout(() => {
        window.open('https://drive.google.com/file/d/example-resume-link/view', '_blank');
      }, 500);
      return `> resume

Opening my resume... 📄

You can also view my full portfolio: ${createLink('https://portfolio-okul.vercel.app/', 'Shantanu_Tiwari_Portfolio')}
GitHub Profile: ${createLink('https://github.com/Shantanu-Tiwari', 'github.com/Shantanu-Tiwari')}`;

    case 'clear':
      if (setHistory) {
        setHistory([{
          text: "Welcome to Shantanu Tiwari's Portfolio v2.0.5 (Build date: 19 Jul 2025)",
          isCommand: false,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
      return '';

    case 'date':
      const now = new Date();
      return `> date

${now.toDateString()} ${now.toLocaleTimeString()}
${now.toISOString()}`;

    case 'ls':
      return `> ls

total 8
drwxr-xr-x  2 shantanu shantanu 4096 Jul 19 10:30 projects/
drwxr-xr-x  2 shantanu shantanu 4096 Jul 19 10:30 skills/
-rw-r--r--  1 shantanu shantanu 1024 Jul 19 10:30 about.txt
-rw-r--r--  1 shantanu shantanu 2048 Jul 19 10:30 resume.pdf
-rw-r--r--  1 shantanu shantanu  512 Jul 19 10:30 contact.txt

Hint: Try using the available commands instead! Type 'help' for options.`;

    case 'pwd':
      return `> pwd

/home/shantanu/portfolio
~
You are currently browsing Shantanu Tiwari's portfolio terminal.`;

    case 'cat':
      if (args[0] === 'about.txt') {
        return commandParser('about');
      } else if (args[0] === 'contact.txt') {
        return commandParser('contact');
      } else {
        return `cat: ${args[0] || 'filename'}: No such file or directory
Try 'cat about.txt' or 'cat contact.txt'`;
      }

    case 'sudo':
      const sudoCommand = args.join(' ');
      return `[sudo] password for shantanu: 
sudo: ${sudoCommand || 'command'}: command not found
shantanu is not in the sudoers file. This incident will be reported.

(Just kidding! But you don't need sudo privileges here 😄)`;

    case 'exit':
    case 'logout':
      return `> ${cmd}

Thanks for visiting my portfolio! 👋
To continue exploring, try other commands or refresh the page.

Connection to portfolio maintained... (this is a web terminal!)`;

    case 'history':
      return `> history

Recent commands:
${Array.from({length: 5}, (_, i) => `  ${i + 1}  help`).join('\n')}
  6  about
  7  skills
  8  projects

Use ↑↓ arrow keys to navigate command history.`;

    case 'echo':
      return `> echo ${args.join(' ')}

${args.join(' ')}`;

    case 'version':
    case '--version':
      return `> version

Portfolio Terminal v2.0.5
Built with: React + TypeScript + Tailwind CSS
Runtime: Browser (${navigator.userAgent.split(' ')[0]})
Author: Shantanu Tiwari`;

    default:
      // Handle common typos
      if (['hep', 'hlep', 'hepl'].includes(cmd)) {
        return `Did you mean 'help'?

bash: ${cmd}: command not found`;
      }
      
      return `bash: ${cmd}: command not found
Type 'help' for a list of available commands.`;
  }
};