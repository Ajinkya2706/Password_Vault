'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import VaultList from '../../components/VaultList';
import VaultItemForm from '../../components/VaultItemForm';
import { VaultItem } from '../../types';

export default function DashboardPage() {
  const [editing, setEditing] = useState<VaultItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setEditing(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* mb-6 flex justify-between items-center */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Your Vault</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>

        {showForm || editing ? (
          <VaultItemForm
            item={editing}
            onSuccessAction={handleSuccess}
            onCancelAction={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        ) : (
          <VaultList key={refresh} onEditAction={(item) => setEditing(item)} />
        )}
      </div>
    </div>
  );
}