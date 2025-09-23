import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ProductCard } from "~/components/ProductCard";

export const meta: MetaFunction = () => ([
  { title: "Maison Essences — Parfums d'exception" },
  { name: "description", content: "Boutique de parfums d'exception: best-sellers, nouveautés, et collections exclusives." }
]);

const demoProducts = [
  { slug: "ambre-noir", name: "Ambre Noir", brand: "Maison Essences", price: 89, badge: "Best-seller" as const },
  { slug: "rose-velours", name: "Rose Velours", brand: "Maison Essences", price: 79, badge: "Nouveau" as const },
  { slug: "bois-mystique", name: "Bois Mystique", brand: "Maison Essences", price: 99, badge: null as const },
];

export default function Index() {
  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-black/5 bg-white p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl">Parfums d'exception</h1>
            <p className="text-ink/70">
              Découvrez notre sélection de fragrances raffinées, conçues avec des matières nobles et un savoir-faire artisanal.
            </p>
            <div className="flex gap-3">
              <Link to="/boutique" className="rounded-md bg-ink px-4 py-2 text-white hover:bg-ink/90">Explorer la boutique</Link>
              <Link to="/contact" className="rounded-md border border-ink/20 px-4 py-2 hover:border-ink/40">Nous contacter</Link>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-lg bg-[url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&amp;auto=format&amp;fit=crop&amp;w=1200&amp;ixlib=rb-4.0.3')] bg-cover bg-center" />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Best-sellers</h2>
          <Link to="/boutique" className="text-sm text-ink/70 hover:text-ink">Voir tout</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {demoProducts.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}