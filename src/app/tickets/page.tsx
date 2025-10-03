'use client';
import Card from '@/components/Card';
import { useState } from 'react';

type Ticket = { id:string, subject:string, client:string, status:'open'|'pending'|'closed', priority:'low'|'normal'|'high' };

const seed: Ticket[] = [
  { id:'1', subject:'Bug paiement', client:'AKAGERA', status:'open', priority:'high' },
  { id:'2', subject:'Changement menu', client:'Bocadillos', status:'pending', priority:'normal' },
];

export default function Tickets(){
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [draft, setDraft] = useState<Ticket>({ id:'', subject:'', client:'', status:'open', priority:'normal' });

  const create = ()=>{
    if(!draft.subject || !draft.client) return;
    setTickets(prev=> [...prev, { ...draft, id:String(Date.now()) }]);
    setDraft({ id:'', subject:'', client:'', status:'open', priority:'normal' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Card>
        <h2 className="text-xl font-semibold mb-3">Nouveau ticket</h2>
        <div className="space-y-3">
          <div>
            <div className="label">Sujet</div>
            <input className="input" value={draft.subject} onChange={e=>setDraft({...draft, subject:e.target.value})} />
          </div>
          <div>
            <div className="label">Client</div>
            <input className="input" value={draft.client} onChange={e=>setDraft({...draft, client:e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">Statut</div>
              <select className="input" value={draft.status} onChange={e=>setDraft({...draft, status:e.target.value as any})}>
                <option value="open">Ouvert</option>
                <option value="pending">En attente</option>
                <option value="closed">Fermé</option>
              </select>
            </div>
            <div>
              <div className="label">Priorité</div>
              <select className="input" value={draft.priority} onChange={e=>setDraft({...draft, priority:e.target.value as any})}>
                <option value="low">Basse</option>
                <option value="normal">Normale</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={create}>Créer</button>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-3">Tickets</h2>
        <table>
          <thead><tr><th>Sujet</th><th>Client</th><th>Statut</th><th>Priorité</th></tr></thead>
          <tbody>
            {tickets.map(t=> (
              <tr key={t.id}>
                <td>{t.subject}</td>
                <td>{t.client}</td>
                <td><span className="badge badge-gray">{t.status}</span></td>
                <td><span className="badge badge-amber">{t.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
