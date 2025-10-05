// 'use client';

// import { useState, useEffect } from 'react';
// import { VaultItem } from '../types';
// import PasswordGenerator from '../components/PasswordGenerator';

// export default function VaultItemForm({ 
//   item, 
//   onSuccessAction, 
//   onCancelAction
// }: { 
//   item?: VaultItem | null; 
//   onSuccessAction: () => void; 
//   onCancelAction: () => void; 
// }) {
//   const [form, setForm] = useState({
//     title: '',
//     username: '',
//     password: '',
//     url: '',
//     notes: ''
//   });
//   const [showGen, setShowGen] = useState(false);

//   useEffect(() => {
//     if (item) {
//       fetch(`/api/vault/${item._id}`).then(res => res.json()).then(data => {
//         if (data.success) {
//           setForm({
//             title: data.item.title,
//             username: data.item.username,
//             password: data.item.password,
//             url: data.item.url || '',
//             notes: data.item.notes || ''
//           });
//         }
//       });
//     }
//   }, [item]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const url = item ? `/api/vault/${item._id}` : '/api/vault';
//     const method = item ? 'PUT' : 'POST';

//     // Retrieve token from localStorage or another secure place
//     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

//     const res = await fetch(url, {
//       method,
//       headers: { 
//         'Content-Type': 'application/json',
//         "Authorization": token ? `Bearer ${token}` : '', 
//       },
//       body: JSON.stringify(form),
//       credentials: 'include',
//     });

//     if (res.ok) onSuccessAction();
//   };

//   return (
//     <div className=" p-6 rounded-lg border border-gray-200">
//       <h3 className="text-lg font-semibold mb-4">{item ? 'Edit' : 'Add'} Item</h3>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Username"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//           required
//         />

//         <div className="space-y-2">
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowGen(!showGen)}
//             className="text-sm text-blue-600 hover:underline text-black"
//           >
//             {showGen ? 'Hide' : 'Show'} Generator
//           </button>
//         </div>

//         {showGen && (
//           <PasswordGenerator onGenerateAction={(pwd) => setForm({ ...form, password: pwd })} />
//         )}

//         <input
//           type="url"
//           placeholder="URL (optional)"
//           value={form.url}
//           onChange={(e) => setForm({ ...form, url: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//         />

//         <textarea
//           placeholder="Notes (optional)"
//           value={form.notes}
//           onChange={(e) => setForm({ ...form, notes: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
//           rows={3}
//         />

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={onCancelAction}
//             className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { VaultItem } from '../types';
import PasswordGenerator from '../components/PasswordGenerator';

export default function VaultItemForm({ 
  item, 
  onSuccessAction, 
  onCancelAction
}: { 
  item?: VaultItem | null; 
  onSuccessAction: () => void; 
  onCancelAction: () => void; 
}) {
  const [form, setForm] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });
  const [showGen, setShowGen] = useState(false);

  useEffect(() => {
    if (item) {
      fetch(`/api/vault/${item._id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setForm({
              title: data.item.title,
              username: data.item.username,
              password: data.item.password,
              url: data.item.url || '',
              notes: data.item.notes || ''
            });
          }
        });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = item ? `/api/vault/${item._id}` : '/api/vault';
    const method = item ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include',
    });

    if (res.ok) onSuccessAction();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">{item ? 'Edit' : 'Add'} Item</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg text-white"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg text-white"
          required
        />
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg text-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowGen(!showGen)}
            className="text-sm text-neutral-400 hover:text-white"
          >
            {showGen ? '− Hide' : '+ Show'} Generator
          </button>
        </div>
        {showGen && <PasswordGenerator onGenerateAction={(pwd) => setForm({ ...form, password: pwd })} />}
        <input
          type="url"
          placeholder="URL (optional)"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg text-white"
        />
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg text-white resize-none"
          rows={3}
        />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-neutral-200 font-medium">
            Save
          </button>
          <button type="button" onClick={onCancelAction} className="flex-1 bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-700">
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
    
  );
}