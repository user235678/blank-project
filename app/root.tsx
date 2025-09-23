import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";import {
  Links,  LiveReload,
  Meta,  Outlet,
  Scripts,  ScrollRestoration,
  NavLink,  Link,
  useLoaderData,} from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
export const links: LinksFunction = () => [  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {    rel: "stylesheet",
    href:      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&amp;family=Inter:wght@400;600&amp;display=swap",
  },];
export async function loader({}: LoaderFunctionArgs) {
  return {    shopName: "Maison Essences",
  };}
export default function App() {
  const { shopName } = useLoaderData<typeof loader>();  return (
   <html lang="fr" className="h-full bg-ivory text-ink">
     <head>
       <meta charSet="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <Meta />
       <Links />
    </head>
      <body className="min-h-full antialiased">
       <header className="border-b border-black/5 bg-white/80 backdrop-blur">
         <div className="container flex items-center justify-between py-4">
           <Link to="/" className="text-xl font-semibold tracking-tight">
             <span className="font-serif">{shopNam}</span>
           </Link>
            <nav className="flex items-center gap-6">
             <NavLink to="/boutique" className={({ isActive }) => (isActive ? "text-ink" : "text-ink/70 hover:text-ink")}>
                Boutique             </NavLink>
              <NavLink to="/panier" className={({ isActive }) => (isActive ? "text-ink" : "text-ink/70 hover:text-ink")}>
                Panier             </NavLink>
              <NavLink to="/compte" className={({ isActive })