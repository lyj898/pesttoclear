/**
 * JSON-LD builders. One graph per page, emitted by BaseLayout.
 *
 * Deliberate omissions:
 *   - No `LocalBusiness`. The site has no premises and does no treatment itself.
 *   - No `AggregateRating` or `Review`. No reviews have been collected.
 *   - No `offers` or prices. Prices come from the partner after an inspection.
 */

import { company } from './data';
import { ORIGIN, canonical, type Path } from './urls';
import type { Pest } from '../types';

export const ORG_ID = `${ORIGIN}/#org`;

type JsonLdNode = Record<string, unknown>;

export function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.tradingName,
    url: `${ORIGIN}/`,
    description: company.businessModelStatement,
    // The family's mother site. No company runs the family (independence, 6 Oct 2026).
    parentOrganization: {
      '@type': 'Organization',
      name: company.parentOrganization.name,
      url: company.parentOrganization.url,
    },
    // The inbox is deliberately not published. Contact is form-only.
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${ORIGIN}/contact/`,
      areaServed: 'SG',
      availableLanguage: 'English',
    },
    areaServed: { '@type': 'Country', name: 'Singapore' },
  };
}

export function webSiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: company.tradingName,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-SG',
  };
}

export function webPageNode(pagePath: Path, title: string, description: string): JsonLdNode {
  return {
    '@type': 'WebPage',
    '@id': `${canonical(pagePath)}#webpage`,
    url: canonical(pagePath),
    name: title,
    description,
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': ORG_ID },
  };
}

/**
 * Service node for the pest pages. `broker` rather than `provider`: this site
 * arranges the treatment, and a partner firm carries it out.
 */
export function serviceNode(name: string, summary: string, pagePath: Path): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${canonical(pagePath)}#service`,
    name: `${name} in Singapore`,
    serviceType: name,
    description: summary,
    url: canonical(pagePath),
    broker: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Singapore' },
  };
}

export const pestServiceNode = (pest: Pest, pagePath: Path): JsonLdNode =>
  serviceNode(pest.serviceName, pest.summary, pagePath);

export interface Crumb {
  name: string;
  path: Path;
}

export function breadcrumbNode(crumbs: Crumb[], pagePath: Path): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonical(c.path),
    })),
  };
}

export const graph = (nodes: JsonLdNode[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
