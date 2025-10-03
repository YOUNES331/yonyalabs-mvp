'use client';
import Card from '@/components/Card';
import { useState } from 'react';

type Contact = { id:string, name:string, email?:string, phone?:string, company?:string, status:'lead'|'client' };

const seed: Contact[] = [
  { id:'1', name:'AKAGERA', company:'AKAGERA', email:'contact@akagera.com', status:'client' },
  { id:'2', name:'Bocadillos Chamali', company:'Bocadillos', status:'client' },
  { id:'3', name:'Pradeo', company:'Pradeo', status:'lead' },
];

export default function CRM(){
  const [contacts, setContacts] = useState<Contact[]>(seed);
  const [filter, setFilter] = useState<'all'|'lead'|'client'>('all');

  const filtered = contacts.filter(c => filter==='all' || c.status===filter);

  return (
    <div className="space-y-4 mt-6">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">CRM</h2>
          <div className="flex gap-2">
            <button className="btn" onClick={()=>setFilter('all')}>Tous</button>
            <button className="btn" onClick={()=>setFilter('lead')}>Leads</button>
            <button className="btn" onClick={()=>setFilter('client')}>Clients</button>
          </div>
        </div>
      </Card>
      <Card>
        <table>
          <thead><tr><th>Nom</th><th>Entreprise</th><th>Statut</th></tr></thead>
          <tbody>
            {filtered.map(c=> (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td><span className={`badge ${c.status==='client'?'badge-green':'badge-amber'}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
