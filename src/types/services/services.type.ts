// types/diensten/types.ts

/** ---- CategoryId: één bron van waarheid via const-array ---- */
export const CATEGORY_IDS = [
  "totaalbouw",
  "ruwbouw",
  "dakwerken",
  "afbouw",
  "interieurbouw",
  "installaties",
] as const;

export type CategoryId = typeof CATEGORY_IDS[number];

/** ---- Href: alleen root-relatief of http(s):// ---- */
export type InternalHref = `/${string}`;
export type ExternalHref = `http${"s" | ""}://${string}`;
export type Href = InternalHref | ExternalHref;

/** ---- Herbruikbare SEO-meta ---- */
export type SeoMeta = {
  title?: string;
  description?: string;
  image?: Href; // bewust Href i.p.v. string
};

/** ---- Handige utility types ---- */
export type NonEmptyArray<T> = readonly [T, ...T[]];

/** DeepReadonly voor config die je absoluut niet wilt muteren */
export type DeepReadonly<T> =
  T extends (...args: any) => any
    ? T
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepReadonly<U>>
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

/** ---- Kernmodellen ---- */
export type ServiceItem = {
  label: string;
  slug: string;
  ctaHref?: Href;
  excerpt?: string;
  description?: string;
  thumb?: Href;   // was string
  icon?: Href;    // was string (pas aan naar string als je icon-namen gebruikt)
  seo?: SeoMeta;
};

export type ServiceCategory = {
  id: CategoryId;
  title: string;
  description: string;
  items: ServiceItem[]; // laat leeg toe voor backwards-compat
  ctaHref?: Href;
  icon?: Href;       // was string
  heroImage?: Href;  // was string
  seo?: SeoMeta;
};

/** Variant die minimaal één item eist (optioneel te gebruiken) */
export type ServiceCategoryNonEmpty =
  Omit<ServiceCategory, "items"> & { items: NonEmptyArray<ServiceItem> };

/** ---- Overzichten ---- */
export type ServiceCategoryList = ReadonlyArray<ServiceCategory>;
export type ServiceCategoryMap = Readonly<Record<CategoryId, ServiceCategory>>;

/** Diep readonly varianten voor onveranderlijke configuraties */
export type ImmutableServiceCategoryList = DeepReadonly<ServiceCategoryList>;
export type ImmutableServiceCategoryMap = DeepReadonly<ServiceCategoryMap>;
