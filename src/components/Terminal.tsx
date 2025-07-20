import React, { useState, useEffect, useRef } from 'react';
import { commandParser } from '../utils/commandParser';

interface HistoryItem {
  text: string;
  isCommand: boolean;
  isError?: boolean;
  timestamp?: string;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      text: "Welcome to Shantanu Tiwari's Portfolio v2.0.5 (Build date: 19 Jul 2025)",
      isCommand: false,
      timestamp: new Date().toLocaleTimeString()
    },
    {
      text: "Type 'help' to see a list of available commands.",
      isCommand: false
    }
  ]);

  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
    } else {
      newIndex = historyIndex - 1 >= -1 ? historyIndex - 1 : -1;
    }

    setHistoryIndex(newIndex);
    setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
  };

  const handleTabCompletion = () => {
    const commands = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'clear', 'date', 'whoami'];
    const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));

    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      const output = commandParser('help', matches);
      addToHistory(input, true);
      addToHistory(output, false);
      setInput('');
    }
  };

  const addToHistory = (text: string, isCommand: boolean, isError: boolean = false) => {
    setHistory(prev => [...prev, {
      text,
      isCommand,
      isError,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const processCommand = () => {
    if (input.trim() === '') return;

    const trimmedInput = input.trim();

    // Add command to history
    addToHistory(`shantanu@portfolio:~$ ${trimmedInput}`, true);

    // Update command history for arrow key navigation
    setCommandHistory(prev => [trimmedInput, ...prev].slice(0, 50)); // Keep last 50 commands
    setHistoryIndex(-1);

    const output = commandParser(trimmedInput, [], setHistory);

    if (output) {
      addToHistory(output, false, trimmedInput.toLowerCase().startsWith('error'));
    }

    setInput('');
  };

  const renderHistoryItem = (item: HistoryItem, index: number) => {
    if (item.text === 'clear') return null;

    const className = `terminal-output ${
        item.isCommand ? 'terminal-prompt' :
            item.isError ? 'terminal-error' :
                'text-foreground'
    }`;

    if (typeof item.text === 'string' && item.text.includes('<a ')) {
      return (
          <div key={index} className={className}>
            <span dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
      );
    }

    return (
        <div key={index} className={className}>
          {item.text}
        </div>
    );
  };

  return (
      <div
          className="terminal-container h-screen overflow-hidden flex flex-col cursor-text"
          onClick={handleTerminalClick}
      >
        <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto terminal-scroll p-4 pb-2"
        >
          {history.map((item, index) => renderHistoryItem(item, index))}

          <div className="command-line">
            <span className="terminal-prompt">shantanu@portfolio:~$</span>
            <div className="relative">
              <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input caret-transparent pr-2"
                  autoFocus
                  spellCheck={false}
              />
              <span className="absolute left-0 top-0 pointer-events-none select-none flex">
              <span className="invisible">{input}</span>
              <span className="cursor" />
            </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-4 pt-0 border-t border-muted/20">
          <p>Tip: Use Tab for auto-completion, ↑↓ for command history</p>
        </div>
      </div>
  );
};

export default Terminal;