import { Link } from "@remix-run/react";
import { clsx } from "clsx";

export type ProductCardProps = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  badge?: "Nouveau" | "Best-seller" | null;
};

export function ProductCard({ slug, name, brand, price, image, badge }: ProductCardProps) {
  return (
    <Link to={`/produit/${slug}`} className="group block overflow-hidden rounded-lg border border-black/5 bg-white">
      <div className="relative aspect-[4/5] w-full bg-ivory">
        {image ? (
          // Placeholder: In a real app, use an optimized image component
          <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink/30">Image</div>
        )}
        {badge ? (
          <span
            className={clsx(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium",
              badge === "Nouveau" ? "bg-ink text-ivory" : "bg-gold text-white"
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-4 p-4">
        <div>
          <p className="text-sm text-ink/60">{brand}</p>
          <h3 className="font-medium">{name}</h3>
        </div>
        <p className="shrink-0 font-semibold">{price.toFixed(2)} €</p>
      </div>
    </Link>
  );
}