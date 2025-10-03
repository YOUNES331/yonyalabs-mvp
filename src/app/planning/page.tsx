'use client';
import Card from '@/components/Card';
import { useState } from 'react';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';

type Event = { id:string, title:string, start:string, end:string };

const today = new Date();
const iso = (d:Date)=> d.toISOString().slice(0,16);

const seed: Event[] = [
  { id:'1', title:'Call AKAGERA', start: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0)), end: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30)) },
  { id:'2', title:'Livraison site Bocadillos', start: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0)), end: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0)) },
];

export default function Planning(){
  const [events, setEvents] = useState<Event[]>(seed);
  const [draft, setDraft] = useState<Event>({ id:'', title:'', start: iso(today), end: iso(today) });

  const add = ()=>{
    if(!draft.title) return;
    setEvents(prev=> [...prev, { ...draft, id: String(Date.now()) }]);
    setDraft({ id:'', title:'', start: iso(today), end: iso(today) });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Card>
        <h2 className="text-xl font-semibold mb-3">Planifier un évènement</h2>
        <div className="space-y-3">
          <div>
            <div className="label">Titre</div>
            <input className="input" value={draft.title} onChange={e=>setDraft({...draft, title:e.target.value})} placeholder="Ex: RDV Client" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">Début</div>
              <input className="input" type="datetime-local" value={draft.start} onChange={e=>setDraft({...draft, start:e.target.value})} />
            </div>
            <div>
              <div className="label">Fin</div>
              <input className="input" type="datetime-local" value={draft.end} onChange={e=>setDraft({...draft, end:e.target.value})} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={add}>Ajouter</button>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-3">Évènements du jour</h2>
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(ev.start), 'HH:mm', { locale: fr })} – {format(new Date(ev.end), 'HH:mm', { locale: fr })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
