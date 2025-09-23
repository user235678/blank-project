import type { MetaFunction } from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";
import { ProductCard } from "~/components/ProductCard";

export const meta: MetaFunction = () => ([
  { title: "Boutique — Maison Essences" },
]);

const products = [
  { slug: "ambre-noir", name: "Ambre Noir", brand: "Maison Essences", price: 89, badge: "Best-seller" as const, family: "Oriental" },
  { slug: "rose-velours", name: "Rose Velours", brand: "Maison Essences", price: 79, badge: "Nouveau" as const, family: "Floral" },
  { slug: "bois-mystique", name: "Bois Mystique", brand: "Maison Essences", price: 99, badge: null as const, family: "Boisé" },
  { slug: "citrus-lumineux", name: "Citrus Lumineux", brand: "Maison Essences", price: 69, badge: null as const, family: "Agrumes" },
];

export default function Boutique() {
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const family = params.get("famille");

  const filtered = products.filter(p => {
    const matchesQuery = q ? (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) : true;
    const matchesFamily = family ? p.family === family : true;
    return matchesQuery && matchesFamily;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl">Boutique</h1>
          <p className="text-ink/70">Parcourez nos collections par famille olfactive.</p>
        </div>
        <Form method="get" className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Recherche (nom, marque)…"
            className="rounded-md border border-ink/20 bg-white px-3 py-2 outline-none focus:border-ink/40"
          />
          <select
            name="famille"
            defaultValue={family ?? ""}
            className="rounded-md border border-ink/20 bg-white px-3 py-2 outline-none focus:border-ink/40"
          >
            <option value="">Toutes les familles</option>
            <option>Oriental</option>
            <option>Floral</option>
            <option>Boisé</option>
            <option>Agrumes</option>
          </select>
          <button className="rounded-md bg-ink px-4 py-2 text-white hover:bg-ink/90">Filtrer</button>
        </Form>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} {...p} />
        ))}
        {filtered.length === 0 && <p className="text-ink/60">Aucun produit ne correspond à votre recherche.</p>}
      </div>
    </div>
  );
}