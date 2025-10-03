'use client';
import Card from '@/components/Card';
import { useState } from 'react';
import { z } from 'zod';
import { currency } from '@/lib/utils';

const itemSchema = z.object({
  label: z.string().min(1),
  qty: z.coerce.number().positive(),
  unit: z.coerce.number().nonnegative(),
  vat: z.coerce.number().min(0)
});

type Item = z.infer<typeof itemSchema>;
type Invoice = { id:string, number:string, client:string, items:Item[], status:'draft'|'sent'|'paid'|'overdue' };

const calc = (items:Item[])=>{
  const total_ht = items.reduce((s,i)=> s + i.qty*i.unit, 0);
  const total_tva = items.reduce((s,i)=> s + i.qty*i.unit*(i.vat/100), 0);
  return { total_ht, total_tva, total_ttc: total_ht + total_tva };
};

export default function Invoices(){
  const [list, setList] = useState<Invoice[]>([]);
  const [items, setItems] = useState<Item[]>([{label:'Création site vitrine', qty:1, unit:1200, vat:20}]);
  const [client, setClient] = useState('AKAGERA');
  const [prefix, setPrefix] = useState(`${new Date().getFullYear()}-`);

  const addItem = ()=> setItems(prev=> [...prev, {label:'', qty:1, unit:0, vat:20}]);
  const removeItem = (idx:number)=> setItems(prev=> prev.filter((_,i)=> i!==idx));

  const create = ()=>{
    const seq = list.length + 1;
    const number = `${prefix}${String(seq).padStart(4,'0')}`;
    setList(prev=> [...prev, { id: String(Date.now()), number, client, items, status:'draft' }]);
  };

  const { total_ht, total_tva, total_ttc } = calc(items);

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Card>
        <h2 className="text-xl font-semibold mb-3">Nouvelle facture</h2>
        <div className="space-y-3">
          <div>
            <div className="label">Client</div>
            <input className="input" value={client} onChange={e=>setClient(e.target.value)} />
          </div>
          <div>
            <div className="label">Préfixe numérotation</div>
            <input className="input" value={prefix} onChange={e=>setPrefix(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="label">Lignes</div>
            {items.map((it, idx)=> (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <input className="input col-span-6" placeholder="Désignation" value={it.label} onChange={e=>{
                  const copy=[...items]; copy[idx].label=e.target.value; setItems(copy);
                }} />
                <input className="input col-span-2" type="number" placeholder="Qté" value={it.qty} onChange={e=>{
                  const copy=[...items]; copy[idx].qty=Number(e.target.value||1); setItems(copy);
                }} />
                <input className="input col-span-2" type="number" placeholder="PU HT" value={it.unit} onChange={e=>{
                  const copy=[...items]; copy[idx].unit=Number(e.target.value||0); setItems(copy);
                }} />
                <input className="input col-span-1" type="number" placeholder="TVA%" value={it.vat} onChange={e=>{
                  const copy=[...items]; copy[idx].vat=Number(e.target.value||0); setItems(copy);
                }} />
                <button className="btn col-span-1" onClick={()=>removeItem(idx)}>X</button>
              </div>
            ))}
            <button className="btn" onClick={addItem}>+ Ligne</button>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Total HT : <b>{currency(total_ht)}</b></div>
            <div>TVA : <b>{currency(total_tva)}</b></div>
            <div>Total TTC : <b>{currency(total_ttc)}</b></div>
          </div>
          <button className="btn btn-primary" onClick={create}>Créer la facture</button>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-3">Factures</h2>
        <table>
          <thead><tr><th>#</th><th>Client</th><th>Total TTC</th><th>Statut</th></tr></thead>
          <tbody>
            {list.map(inv=> {
              const totals = calc(inv.items);
              return (
                <tr key={inv.id}>
                  <td>{inv.number}</td>
                  <td>{inv.client}</td>
                  <td>{currency(totals.total_ttc)}</td>
                  <td><span className="badge badge-gray">{inv.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
