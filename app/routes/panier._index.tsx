import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { addToCart, getCart, removeFromCart, setCartHeader, updateQty } from "~/utils/session.server";

const CATALOG = {
  "ambre-noir": { name: "Ambre Noir", price: 89 },
  "rose-velours": { name: "Rose Velours", price: 79 },
  "bois-mystique": { name: "Bois Mystique", price: 99 },
} as const;

export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request);
  const items = cart.map((c) => {
    const p = (CATALOG as any)[c.slug];
    return { ...c, ...p, total: p ? p.price * c.qty : 0 };
  });
  const total = items.reduce((s, i) => s + i.total, 0);
  return json({ items, total });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const intent = String(form.get("_intent") || "");
  const slug = String(form.get("slug") || "");
  const qty = Number(form.get("qty") || 1);

  let cart = await getCart(request);

  if (intent === "add" && slug) {
    cart = addToCart(cart, slug, qty);
  } else if (intent === "remove" && slug) {
    cart = removeFromCart(cart, slug);
  } else if (intent === "update" && slug) {
    cart = updateQty(cart, slug, Math.max(1, qty));
  }

  const headers = new Headers({ "Set-Cookie": await setCartHeader(cart) });

  // To keep things simple here, stay on the cart page
  return redirect("/panier", { headers });
}

export default function CartPage() {
  const { items, total } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl">Panier</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border border-black/5 bg-white p-6">
          <p className="text-ink/70">Votre panier est vide.</p>
          <div className="mt-4">
            <Link to="/boutique" className="rounded-md bg-ink px-4 py-2 text-white hover:bg-ink/90">Continuer mes achats</Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.slug} className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-4">
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="text-sm text-ink/60">{it.price.toFixed(2)} €</p>
                </div>
                <div className="flex items-center gap-3">
                  <Form method="post" replace className="flex items-center gap-2">
                    <input type="hidden" name="_intent" value="update" />
                    <input type="hidden" name="slug" value={it.slug} />
                    <input
                      type="number"
                      name="qty"
                      min={1}
                      defaultValue={it.qty}
                      className="w-16 rounded-md border border-ink/20 px-2 py-1"
                    />
                    <button className="rounded-md border border-ink/20 px-3 py-1 hover:border-ink/40">Mettre à jour</button>
                  </Form>
                  <Form method="post" replace>
                    <input type="hidden" name="_intent" value="remove" />
                    <input type="hidden" name="slug" value={it.slug} />
                    <button className="text-sm text-ink/60 hover:text-ink">Supprimer</button>
                  </Form>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-lg border border-black/5 bg-white p-6">
            <div className="flex items-center justify-between">
              <p>Total</p>
              <p className="text-xl font-semibold">{total.toFixed(2)} €</p>
            </div>
            <button
              className="w-full rounded-md bg-ink px-4 py-2 text-white hover:bg-ink/90"
              onClick={() => alert("Le paiement Stripe sera intégré ensuite.")}
            >
              Passer au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}