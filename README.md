# pesttoclear.com

PestToClear: a pest-control matching service in Singapore, run by the team behind Junk to Clear.
Enquiries arrive through a FormSubmit form, and the user passes each one to a partner pest-control firm.
Built the way HomeToClean is (structure copied, not text). Brief: `../jtc-family/briefs/pesttoclear.md`.

## Stack

Astro 5 + Tailwind 4, static output, `trailingSlash: 'always'`. Deployed by `.github/workflows/deploy.yml`
(GitHub Actions to Pages). `public/CNAME` and `public/.nojekyll` must stay in the published output.
GA4 comes from the `PUBLIC_GA4_ID` build variable (a repo variable in CI); without it no analytics loads.

```
npm run dev      # local dev server
npm run build    # validate data, astro check, build
npm run audit    # audit dist/ (run after build)
npm run verify   # build + audit
```

## Pages

- `/`, `/pest-control/` (general) and one page per pest, generated from `src/data/pests.json`
- `/how-it-works/`, `/about/`, `/contact/`, `/privacy/`

Each pest page covers what the problem looks like, treatment options, what affects the price, how to prepare
and what happens on the day, and HDB, condo, landed and office premises. `validate-data.mjs` fails the
build if any of those is missing.

## Rules (enforced by `scripts/validate-data.mjs` and `scripts/audit-build.mjs`)

- **Matching service.** Never "our technicians", "our team treats" or "our crew". The partner firm does the work.
- **No pest × town pages**, and nothing nested below a pest page. That pattern got OurKampung pruned.
- **No prices** until partners give real ranges: say the price comes after an inspection or quote.
- **No invented statistics, reviews, ratings or testimonials**, in copy or in JSON-LD.
- **NEA.** Say a firm is NEA-licensed only once that partner is checked, and with the official NEA source
  linked. Today the site states the law (vector control operators must be registered with NEA) and links
  NEA's page; it makes no claim about any firm. Any page that mentions NEA must link nea.gov.sg.
- **One GA4 event:** `generate_lead`, after FormSubmit confirms delivery. No `form_submit`, `button_click` or `form_start`. Family standard (PORTFOLIO.md).
  Mark it as the only key event in GA4.
- **Form.** Subject is `PestToClear – <page>`. The PDPA line says the details go to the team behind Junk to
  Clear, which passes them to the partner who'll quote. The inbox address appears only in the endpoint.
- **Family links.** None in the header or footer. The About page links Junk to Clear; the bed-bug page
  links its disposal service where a mattress has to go, saying the same team runs it. Never `rel="noreferrer"`.

## Before launch

- The user sees the site and says to publish (brief: don't publish until then).
- A partner is ready to take jobs. No partner names or terms on the site.
- Send one test enquiry from the live domain; FormSubmit may ask to confirm the new site.

The user approved publishing on 30 Sep 2026, and confirmed SKAP Waste Management Pte Ltd as the entity in the
footer and privacy policy. They also asked to leave out two promises: "you don't pay us anything" and "we'll
take it up with the firm". Don't add either back without asking.
