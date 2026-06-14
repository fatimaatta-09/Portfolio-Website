import React, { useState, useEffect } from 'react';

const BOOT_MESSAGES = [
  '[ OK ] Loading kernel modules...',
  '[ OK ] Mounting encrypted filesystem...',
  '[ OK ] Initialising network interfaces...',
  '[ OK ] Starting security daemons...',
  '[ OK ] Loading AI / ML modules...',
  '[ OK ] Spawning desktop environment...',
  '[ OK ] Welcome, Fatima Rehman ✓',
];

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let delay = 0;
    BOOT_MESSAGES.forEach((msg, index) => {
      delay += Math.random() * 300 + 200; // Random delay between 200-500ms
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, msg]);
        if (index === BOOT_MESSAGES.length - 1) {
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 500); // Fade out delay
          }, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#02060f] text-[#10F080] font-mono p-6 flex flex-col justify-center items-center transition-opacity duration-500 ${isDone ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-2xl">
        <h1 className="text-[#00C8FF] text-4xl font-bold mb-8 text-center animate-pulse">FR-OS</h1>
        <div className="space-y-2 text-sm md:text-base">
          {visibleLines.map((line, i) => (
            <div key={i} className={i === BOOT_MESSAGES.length - 1 ? "text-[#00C8FF]" : ""}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
