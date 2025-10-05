'use client';

import { useState, useEffect } from 'react';
import { VaultItem } from '../types';
import { copyToClipboard, autoClearClipboard } from '../lib/clipboard';

export default function VaultList({  onEditAction,
}: {
  onEditAction: (item: VaultItem) => void;
}) {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

 const fetchItems = async () => {
  const res = await fetch('/api/vault', { credentials: 'include' });
  const data = await res.json();
  if (data.success) setItems(data.items);
};

const handleCopy = async (itemId: string) => {
  const res = await fetch(`/api/vault/${itemId}`, { credentials: 'include' });
  const data = await res.json();
  if (data.success) {
    await copyToClipboard(data.item.password);
    setCopied(itemId);
    autoClearClipboard(15000);
    setTimeout(() => setCopied(null), 2000);
  }
};

const handleDelete = async (id: string) => {
  if (!confirm('Delete this item?')) return;
  await fetch(`/api/vault/${id}`, { 
    method: 'DELETE',
    credentials: 'include' 
  });
  fetchItems();
};

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search vault..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" bg-grey w-full px-4 py-2 border border-gray-300 rounded-lg"
      />

      <div className="space-y-2">
        {filtered.map(item => (
          <div key={item._id} className="bg-black p-4 rounded-lg border border-gray-200 flex justify-between items-center">
            <div className="flex-1">
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-white-600">{item.username}</p>
              {item.url && <p className="text-xs text-gray-400">{item.url}</p>}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleCopy(item._id)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                {copied === item._id ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={() => onEditAction(item)}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm" 
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}