import Card from '@/components/Card';

export default function Page(){
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">Encours factures</h2>
        <p>Vos clients doivent : <b>€ 4 200</b></p>
        <p className="text-sm text-gray-500">3 factures en retard • 2 à émettre</p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Tickets ouverts (SAV)</h2>
        <p>Tickets ouverts : <b>5</b></p>
        <p className="text-sm text-gray-500">2 urgent • 3 normal</p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Tâches du jour</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Devis AKAGERA – finaliser</li>
          <li>Relance facture #2025-0003</li>
          <li>Installation SSL Bocadillos</li>
        </ul>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Vue rapide</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Prochains RDV : demain 10h (client AKAGERA)</li>
          <li>Objectif CA mensuel : 3 000 € (atteint à 62 %)</li>
        </ul>
      </Card>
    </div>
  );
}
