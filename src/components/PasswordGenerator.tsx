'use client';

import { useState } from 'react';
import { GeneratorOptions } from '../types';

export default function PasswordGenerator({ onGenerateAction }: { onGenerateAction: (pwd: string) => void }) {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true,
    includeLowercase: true,
    excludeSimilar: true
  });

  const generate = () => {
    let chars = '';
    const similar = 'il1Lo0O';
    
    if (options.includeLowercase) chars += 'abcdefghijkmnpqrstuvwxyz';
    if (options.includeUppercase) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (options.includeNumbers) chars += '23456789';
    if (options.includeSymbols) chars += '!@#$%^&*-_=+';

    if (options.excludeSimilar) {
      chars = chars.split('').filter(c => !similar.includes(c)).join('');
    }

    let pwd = '';
    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < options.length; i++) {
      pwd += chars[array[i] % chars.length];
    }
    
    onGenerateAction(pwd);
  };

  return (
    
    <div className="max-w-4xl mx-auto">
    <div className="bg-grey border border-neutral-700 rounded-lg p-4">
      <div className="space-y-4">
        <div>
          <div className="flex br mb-2">
            <label className="text-sm text-white padding-5px">Length : </label>
            <span className="text-sm text-white font-medium">{options.length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="w-full accent-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'includeUppercase', label: 'A-Z' },
            { key: 'includeLowercase', label: 'a-z' },
            { key: 'includeNumbers', label: '0-9' },
            { key: 'includeSymbols', label: '!@#' },
            { key: 'excludeSimilar', label: 'No Similar' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                checked={options[key as keyof GeneratorOptions] as boolean}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="rounded accent-white"
              />
              {label}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full bg-white text-black py-2.5 rounded-lg hover:bg-neutral-200 transition font-medium"
        >
          Generate
        </button>
      </div>
    </div>
    </div>
  );
}