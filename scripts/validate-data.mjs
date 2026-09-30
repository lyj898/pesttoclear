// Validates src/data/*.json before every build. If it fails, the build fails.
// Run: node scripts/validate-data.mjs
//
// Shape checks keep the templates honest; the copy checks enforce the family
// rules that are easiest to break by accident while writing (see README).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BANNED_COPY } from './copy-rules.mjs';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const read = (f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8'));

const pests = read('pests.json');
const company = read('company.json');

const errors = [];
const err = (m) => errors.push(m);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const str = (v) => typeof v === 'string' && v.trim().length > 0;
const strArr = (v, min) => Array.isArray(v) && v.length >= min && v.every(str);

const seen = new Set();
const titles = new Set();
for (const p of pests) {
  const at = `pest "${p.slug}"`;
  if (!SLUG.test(p.slug)) err(`${at}: slug must be lowercase and hyphenated`);
  if (seen.has(p.slug)) err(`${at}: duplicate slug`);
  seen.add(p.slug);

  for (const k of ['name', 'serviceName', 'metaTitle', 'metaDescription', 'h1', 'summary', 'signsNote', 'treatmentNote', 'afterwards']) {
    if (!str(p[k])) err(`${at}: ${k} is missing or empty`);
  }
  if (str(p.metaTitle) && p.metaTitle.length > 60) err(`${at}: metaTitle is ${p.metaTitle.length} chars (max 60)`);
  if (titles.has(p.metaTitle)) err(`${at}: duplicate metaTitle`);
  titles.add(p.metaTitle);
  if (str(p.metaDescription) && (p.metaDescription.length > 155 || p.metaDescription.length < 70)) {
    err(`${at}: metaDescription is ${p.metaDescription.length} chars (70-155)`);
  }

  if (!strArr(p.intro, 1)) err(`${at}: intro needs at least 1 paragraph`);
  if (!strArr(p.signs, 4)) err(`${at}: signs needs at least 4 entries`);
  if (!strArr(p.priceFactors, 4)) err(`${at}: priceFactors needs at least 4 entries`);
  if (!strArr(p.prepare, 3)) err(`${at}: prepare needs at least 3 entries`);
  if (!strArr(p.onTheDay, 3)) err(`${at}: onTheDay needs at least 3 entries`);

  if (!Array.isArray(p.treatments) || p.treatments.length < 3) err(`${at}: treatments needs at least 3 entries`);
  else p.treatments.forEach((t, i) => {
    if (!str(t.name) || !str(t.body)) err(`${at}: treatments[${i}] needs name and body`);
  });

  // The brief: every pest page covers homes (HDB, condo, landed) and offices.
  for (const k of ['hdb', 'condo', 'landed', 'office']) {
    if (!str(p.premises?.[k])) err(`${at}: premises.${k} is missing or empty`);
  }

  if (!Array.isArray(p.faqs)) err(`${at}: faqs must be an array`);
  else p.faqs.forEach((f, i) => {
    if (!str(f.q) || !str(f.a)) err(`${at}: faqs[${i}] needs q and a`);
  });

  const text = JSON.stringify(p);
  for (const rule of BANNED_COPY) {
    const m = text.match(rule.re);
    if (m) err(`${at}: ${rule.why} ("${m[0]}")`);
  }
}

// --- company ------------------------------------------------------------------
if (!/^https:\/\/formsubmit\.co\/ajax\//.test(company.formSubmit?.endpoint ?? '')) {
  err('company.json: formSubmit.endpoint must be a FormSubmit AJAX endpoint');
}
if (company.formSubmit?.subjectPrefix !== 'PestToClear – ') {
  err('company.json: formSubmit.subjectPrefix must be "PestToClear – " (site in every subject)');
}
if (!/^https:\/\/www\.nea\.gov\.sg\//.test(company.nea?.vcoUrl ?? '')) {
  err('company.json: nea.vcoUrl must be an official nea.gov.sg page');
}
if (company.siteUrl !== 'https://pesttoclear.com') err('company.json: siteUrl must be https://pesttoclear.com');

for (const e of errors) console.error(`  ERROR ${e}`);
console.log(`validate-data: ${pests.length} pests, ${errors.length} error(s)`);
process.exit(errors.length ? 1 : 0);
