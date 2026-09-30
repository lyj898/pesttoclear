/**
 * Enquiry form configuration. Contact is form-only: no phone, WhatsApp or
 * email links anywhere on the site.
 *
 * The FormSubmit endpoint lives in company.json rather than an env var because
 * it is not a secret and it must be present in the static build.
 */

import { company } from './data';

/** Where the enquiry form POSTs. FormSubmit's AJAX endpoint. */
export const FORM_ENDPOINT: string = company.formSubmit.endpoint;

/**
 * Subject line for one page's submissions: "PestToClear – Termite control".
 * The site and page are in every subject so enquiries can be counted per site
 * and per page from the inbox alone.
 */
export const formSubject = (pageName: string): string =>
  `${company.formSubmit.subjectPrefix}${pageName}`;
