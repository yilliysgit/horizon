// src/data/diensten/index.ts (of jouw file)
import afbouwData from "./afbouw/afbouw.data";
import dakwerkenData from "./dakwerken/dakwerken.data";
import installatiesData from "./installaties/installaties.data";
import interieurbouwData from "./interieurbouw/interieurbouw.data";
import ruwbouwData from "./ruwbouw/ruwbouw.data";
import totaalbouwData from "./totaalbouw/totaalbouw.data";

import type {
  ServiceCategoryList,
  ServiceCategoryMap,
} from "@/types/services/services.type";

export const serviceCategories: ServiceCategoryList = [
  totaalbouwData,
  ruwbouwData,
  dakwerkenData,
  afbouwData,
  interieurbouwData,
  installatiesData,
];

// ✅ Map veilig opbouwen (lowercase keys)
export const serviceCategoryMap: ServiceCategoryMap = Object.fromEntries(
  serviceCategories.map((c) => [c.id.toLowerCase(), c])
) as ServiceCategoryMap;
