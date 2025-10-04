"use client";
import React from "react";
import Script from "next/script";

export type Crumb = {
  label: string;
  href?: string; // geen href = current page
};

type BreadcrumbProps = {
  items: Crumb[];
  baseUrl?: string; // jouw site-URL voor JSON-LD (bv. "https://horizontotaalbouw.nl")
};

export default function Breadcrumb({ items, baseUrl }: BreadcrumbProps) {
  // JSON-LD only if baseUrl is set
  const breadcrumbJsonLd = baseUrl
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href
            ? { item: baseUrl.replace(/\/$/, "") + item.href }
            : {}),
        })),
      }
    : null;

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-blue-600 hover:underline"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-slate-500">{item.label}</span>
                )}
                {!isLast && <span className="text-slate-400">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      {breadcrumbJsonLd && (
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
    </>
  );
}



// import Breadcrumb from "@/components/Breadcrumb";

// export default function Page() {
// return (
//    <>
//      <Breadcrumb
//        baseUrl="https://horizontotaalbouw.nl"
//        items={[
//          { label: "Home", href: "/" },
//          { label: "Diensten", href: "/diensten" },
//          { label: "Keukenrenovatie" }, // current page
//        ]}
//      />

//      {/* Hero hier */}
//    </>
//  );
// }