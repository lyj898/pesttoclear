/**
 * The single place raw JSON becomes typed data. Templates import from here,
 * never from the JSON directly. scripts/validate-data.mjs checks the shapes
 * before every build, which is what makes these assertions safe.
 */

import pestsRaw from '../data/pests.json';
import companyRaw from '../data/company.json';

import type { Company, Pest } from '../types';

export const pests = pestsRaw as unknown as Pest[];
export const company = companyRaw as unknown as Company;

const pestIndex = new Map(pests.map((p) => [p.slug, p]));

/** Throws rather than returning undefined: a missing slug is a data bug. */
export function getPest(slug: string): Pest {
  const found = pestIndex.get(slug);
  if (!found) throw new Error(`Unknown pest slug: "${slug}"`);
  return found;
}
