import { createCookie } from "@remix-run/node";

type CartItem = { slug: string; qty: number };

export const cartCookie = createCookie("cart", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  secrets: [process.env.SESSION_SECRET || "dev-secret"],
});

export async function getCart(request: Request): Promise<CartItem[]> {
  const cookie = request.headers.get("Cookie");
  const raw = (await cartCookie.parse(cookie)) as CartItem[] | undefined;
  return raw ?? [];
}

export async function setCartHeader(cart: CartItem[]) {
  return await cartCookie.serialize(cart);
}

export function addToCart(cart: CartItem[], slug: string, qty = 1): CartItem[] {
  const existing = cart.find((c) => c.slug === slug);
  if (existing) existing.qty += qty;
  else cart.push({ slug, qty });
  return cart;
}

export function removeFromCart(cart: CartItem[], slug: string): CartItem[] {
  return cart.filter((c) => c.slug !== slug);
}

export function updateQty(cart: CartItem[], slug: string, qty: number): CartItem[] {
  return cart.map((c) => (c.slug === slug ? { ...c, qty } : c));
}