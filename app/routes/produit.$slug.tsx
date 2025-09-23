import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

const PRODUCTS = {
  "ambre-noir": {
    name: "Ambre Noir",
    brand: "Maison Essences",
    price: 89,
    description:
      "Un oriental ambré enveloppant, aux accents de vanille et d'encens. Élégant et mystérieux.",
    notes: ["Ambre", "Vanille", "Encens"],
  },
  "rose-velours": {
    name: "Rose Velours",
    brand: "Maison Essences",
    price: 79,
    description:
      "Un floral sensuel où la rose se mêle à l'iris et au musc pour une caresse poudrée.",
    notes: ["Rose", "Iris", "Musc"],
  },
  "bois-mystique": {
    name: "Bois Mystique",
    brand: "Maison Essences",
    price: 99,
    description:
      "Des bois précieux et des épices fines pour une signature profonde et sophistiquée.",
    notes: ["Santal", "Cèdre", "Poivre rose"],
  },
} as const;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Produit introuvable — Maison Essences" }];
  return [{ title: `${data.name} — Maison Essences` }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;
  const product = (PRODUCTS as any)[slug];
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return { slug, ...product };
}

export default function ProductPage() {
  const product = useLoaderData<typeof loader>();
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-black/5 bg-ivory">
        <div className="flex h-full items-center justify-center text-ink/30">Image produit</div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-ink/60">{product.brand}</p>
          <h1 className="font-serif text-2xl sm:text-3xl">{product.name}</h1>
        </div>
        <p className="text-ink/80">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.notes.map((n: string) => (
            <span key={n} className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink/70">
              {n}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">{product.price.toFixed(2)} €</p>
          <form method="post" action="/panier">
            <input type="hidden" name="slug" value={product.slug} />
            <button className="rounded-md bg-ink px-4 py-2 text-white hover:bg-ink/90">Ajouter au panier</button>
          </form>
        </div>
        <div>
          <Link to="/boutique" className="text-sm text-ink/70 hover:text-ink">← Retour à la boutique</Link>
        </div>
      </div>
    </div>
  );
}