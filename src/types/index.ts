/** Shapes of the JSON in src/data. scripts/validate-data.mjs enforces them at build time. */

export interface Faq {
  q: string;
  a: string;
}

export interface Treatment {
  name: string;
  body: string;
}

/** What the pest problem means in each kind of premises. */
export interface Premises {
  hdb: string;
  condo: string;
  landed: string;
  office: string;
}

export interface Pest {
  slug: string;
  /** Plural, as used in nav and headings: "Cockroaches". */
  name: string;
  /** The service as a buyer searches for it: "Cockroach control". */
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One-sentence summary, used on cards and in the Service schema node. */
  summary: string;
  intro: string[];
  signs: string[];
  signsNote: string;
  treatments: Treatment[];
  treatmentNote: string;
  priceFactors: string[];
  prepare: string[];
  onTheDay: string[];
  afterwards: string;
  premises: Premises;
  faqs: Faq[];
  /** Show the one-line pointer to Junk to Clear, a disposal company we refer jobs to, for infested furniture. */
  disposal?: boolean;
}

export interface Company {
  tradingName: string;
  /** Who runs the site, as a phrase: "the OurKampung team". No company is named (independence, 6 Oct 2026). */
  team: string;
  parentOrganization: { name: string; url: string };
  siteUrl: string;
  operatingHoursDisplay: string;
  businessModelStatement: string;
  formSubmit: { endpoint: string; subjectPrefix: string; note: string };
  nea: { vcoUrl: string; checked: string };
}
