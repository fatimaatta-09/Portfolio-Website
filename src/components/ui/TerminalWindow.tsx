import React, { useState, useRef, useEffect } from 'react';

export const TerminalWindow = () => {
  const [history, setHistory] = useState<{type: 'cmd' | 'out' | 'err', text: string}[]>([
    { type: 'out', text: 'FR-OS Terminal v3.0' },
    { type: 'out', text: 'Type "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'cmd' as const, text: `fr@kali:~$ ${input}` }];
      
      switch(cmd) {
        case 'help':
          newHistory.push({ type: 'out', text: 'Commands: whoami, skills, projects, clear' });
          break;
        case 'whoami':
          newHistory.push({ type: 'out', text: 'Fatima Rehman | Cybersecurity Student @ GIKI | 2x Robotics Champion' });
          break;
        case 'skills':
          newHistory.push({ type: 'out', text: 'Security: Burp Suite, Wireshark, OWASP ZAP\nDev: Python, C++, React\nAI: EEG Processing, SVM' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'err', text: `command not found: ${cmd}` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050a18] text-[#10F080] font-mono p-4 text-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2 whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'err' ? 'text-red-500' : line.type === 'cmd' ? 'text-white' : 'text-[#55728A]'}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center mt-2 pt-2 border-t border-[#00C8FF]/20">
        <span className="text-[#10F080] mr-2">fr@kali:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none text-white caret-[#00C8FF]"
          autoFocus
        />
      </div>
    </div>
  );
};
