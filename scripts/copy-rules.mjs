// Copy rules shared by validate-data.mjs (on the JSON) and audit-build.mjs (on
// the rendered pages). Each one is a family or brief rule that is easy to break
// by accident while writing.

export const BANNED_COPY = [
  {
    // PestToClear is a matching service. Partner firms do the work.
    re: /\bour (technicians?|team treats|pest ?controllers?|exterminators?|crews?|specialists?|staff treat)/i,
    why: 'claims our own technicians or crews (matching service: the partner firm does the work)',
  },
  {
    // No prices until partners have quoted real ranges.
    re: /S\$\s?\d|\$\s?\d{2,}|\bSGD\s?\d/i,
    why: 'contains a price (the price comes after an inspection or quote)',
  },
  {
    // No invented statistics.
    re: /\b\d{1,3}(\.\d+)?\s?%|\b\d+(,\d{3})+\+? (homes|customers|jobs|clients)/i,
    why: 'contains a statistic (none are sourced)',
  },
  {
    // Licensing claims need the partner checked and an NEA source. None is yet.
    re: /\b(NEA[- ]licen[cs]ed|licen[cs]ed by (the )?NEA|NEA[- ]registered|registered with NEA)\b(?! as Vector Control Operators)/i,
    why: 'claims a firm is NEA-licensed (only once checked, with the NEA source linked)',
  },
  {
    re: /\b(testimonial|5[- ]star|rated \d|\d(\.\d)? stars?)\b/i,
    why: 'looks like a review or rating (none have been collected)',
  },
  {
    // Independence (6 Oct 2026): no company runs the family, and nothing of
    // SKAP's or Junk to Clear's is borrowed.
    re: /\bSKAP\b|team behind Junk to Clear|\btrading (name|as)\b|\bestablished (in )?2009\b|\bsince 2009\b/i,
    why: 'names SKAP or borrows from Junk to Clear (independence brief: run by the OurKampung team)',
  },
  {
    // Junk to Clear is a company we refer jobs to, never ours or the same team.
    re: /Junk to Clear[^.]{0,80}\b(same team|sister|our team|run by us)\b|\b(our|sister) Junk to Clear\b/i,
    why: 'describes Junk to Clear as ours or the same team (it is a disposal company we refer jobs to)',
  },
];
