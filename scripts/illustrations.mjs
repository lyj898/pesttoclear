// Generates the flat SVG illustrations in public/illo/. Run after editing:
//
//   node scripts/illustrations.mjs
//
// Same approach as OurKampung's assets/illo (soft blob backdrop, ground
// shadow, flat shapes, no strokes on figures), in PestToClear's palette.
// The output files are committed; this script is only needed to change them.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'illo');
mkdirSync(out, { recursive: true });

const C = {
  blob: '#E4EDE3',
  shadow: '#CFDCCD',
  cream: '#FBF8F1',
  line: '#E1D8C7',
  ink: '#2C2A24',
  inkSoft: '#4A463D',
  green: '#1F5A34',
  greenDark: '#163F25',
  leaf: '#8FA476',
  leafDark: '#7E9468',
  amber: '#E3B448',
  amberDark: '#D9A441',
  butter: '#F2D28B',
  sand: '#F1E2C4',
  sandDark: '#E0CFA9',
  wood: '#D9A86C',
  woodDark: '#C4935A',
  brick: '#C9764B',
  roof: '#96502D',
  sky: '#9DBBCB',
  skyPale: '#C4D5DC',
  steel: '#3E4A5C',
  stone: '#8A857B',
  pink: '#E39C8A',
  skin1: '#B97B52',
  skin2: '#F3CDB3',
};

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n${body.trim()}\n</svg>\n`;

/** The soft backdrop and ground shadow every card illustration sits on. */
const stage = () => `
  <path d="M46 126C36 70 94 30 164 30c72 0 124 34 120 96-4 58-64 78-128 78-58 0-100-24-110-78z" fill="${C.blob}"/>
  <ellipse cx="164" cy="184" rx="122" ry="7" fill="${C.shadow}"/>`;

const write = (name, content) => writeFileSync(join(out, `${name}.svg`), content);

// --- cockroaches: a German cockroach by a floor trap -------------------------
write(
  'cockroaches',
  svg(320, 220, `
  ${stage()}
  <ellipse cx="250" cy="172" rx="32" ry="9" fill="#B9C2B5"/>
  <ellipse cx="250" cy="170" rx="25" ry="6.5" fill="#8E978A"/>
  <path d="M231 170h38M237 166.5h26M237 173.5h26" stroke="#6E776A" stroke-width="2"/>
  <g transform="rotate(-18 140 124)">
    <path d="M126 112l-26-14-10 4M124 126l-30 2-8 10M128 140l-22 18-2 12M154 112l26-14 10 4M156 126l30 2 8 10M152 140l22 18 2 12" stroke="#5A2E1A" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="140" cy="132" rx="22" ry="40" fill="#9A5530"/>
    <ellipse cx="131" cy="126" rx="6" ry="20" fill="#B8703F"/>
    <path d="M140 104v66" stroke="#6E3A1F" stroke-width="2.5"/>
    <ellipse cx="140" cy="96" rx="20" ry="13" fill="#C9955E"/>
    <path d="M133 88v14M147 88v14" stroke="#5A2E1A" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="140" cy="82" rx="9" ry="7" fill="#5A2E1A"/>
    <path d="M136 77c-8-18-24-30-44-34M144 77c8-18 24-30 44-34" stroke="#5A2E1A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  <g fill="#3A2A22"><circle cx="196" cy="178" r="1.8"/><circle cx="203" cy="175" r="1.5"/><circle cx="209" cy="179" r="1.8"/><circle cx="92" cy="176" r="1.6"/><circle cx="86" cy="180" r="1.4"/></g>
`),
);

// --- termites: a mud tube climbing a door frame -------------------------------
const termite = (x, y, a) => `
  <g transform="translate(${x} ${y}) rotate(${a})">
    <path d="M-4-3l-6-4M-4 3l-6 4M0-4l0-7M0 4l0 7M4-3l6-5M4 3l6 5" stroke="#B7A488" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="11" cy="0" rx="9" ry="5.5" fill="${C.sand}"/>
    <ellipse cx="0" cy="0" rx="4.5" ry="3.8" fill="${C.sand}"/>
    <ellipse cx="-8" cy="0" rx="5.5" ry="4.5" fill="${C.brick}"/>
  </g>`;
write(
  'termites',
  svg(320, 220, `
  ${stage()}
  <rect x="58" y="158" width="222" height="24" rx="2" fill="#EDE3CF"/>
  <rect x="58" y="158" width="222" height="4" fill="${C.line}"/>
  <rect x="156" y="36" width="40" height="146" rx="2" fill="${C.wood}"/>
  <rect x="186" y="36" width="10" height="146" fill="${C.woodDark}"/>
  <rect x="166" y="62" width="10" height="22" rx="5" fill="#A8743F"/>
  <rect x="164" y="98" width="14" height="30" rx="7" fill="#A8743F"/>
  <rect x="172" y="138" width="8" height="16" rx="4" fill="#A8743F"/>
  <path d="M120 182c-2-18 8-26 18-36s12-26 16-44 4-32 6-40" stroke="#9C6B43" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M120 182c-2-18 8-26 18-36s12-26 16-44 4-32 6-40" stroke="#B88657" stroke-width="3" stroke-dasharray="2 7" fill="none" stroke-linecap="round"/>
  ${termite(232, 176, -8)}
  ${termite(266, 170, 14)}
  <g fill="${C.cream}" stroke="#C8BBA3" stroke-width="1.5">
    <ellipse cx="88" cy="174" rx="16" ry="4" transform="rotate(-12 88 174)"/>
    <ellipse cx="92" cy="179" rx="16" ry="4" transform="rotate(6 92 179)"/>
    <ellipse cx="226" cy="146" rx="14" ry="3.5" transform="rotate(20 226 146)"/>
  </g>
`),
);

// --- bed bugs: a mattress seam under a magnifier ------------------------------
write(
  'bed-bugs',
  svg(320, 220, `
  ${stage()}
  <rect x="54" y="164" width="212" height="12" rx="3" fill="${C.woodDark}"/>
  <rect x="62" y="176" width="8" height="10" fill="${C.roof}"/><rect x="250" y="176" width="8" height="10" fill="${C.roof}"/>
  <rect x="50" y="116" width="220" height="52" rx="10" fill="${C.cream}" stroke="${C.line}" stroke-width="2"/>
  <path d="M60 126h200" stroke="#D2C7B2" stroke-width="2" stroke-dasharray="5 4"/>
  <path d="M150 116h110a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H170c-10-18-18-36-20-52z" fill="#BFD3C0"/>
  <rect x="62" y="96" width="70" height="26" rx="12" fill="#FFFFFF" stroke="${C.line}" stroke-width="2"/>
  <g fill="#3A2A22"><circle cx="84" cy="130" r="2"/><circle cx="92" cy="128" r="1.6"/><circle cx="104" cy="131" r="2"/><circle cx="118" cy="129" r="1.5"/></g>
  <path d="M232 104l24 26" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="208" cy="78" r="38" fill="#FFFFFF" stroke="${C.ink}" stroke-width="6"/>
  <g transform="translate(208 80) rotate(-20)">
    <path d="M-10-10l-12-8M-14 0l-14 0M-10 10l-12 9M10-10l12-8M14 0l14 0M10 10l12 9" stroke="#6F2B21" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="0" cy="4" rx="17" ry="15" fill="#8E3B2E"/>
    <path d="M-13 2h26M-12 9h24M-9 15h18" stroke="#6F2B21" stroke-width="1.6"/>
    <ellipse cx="0" cy="-12" rx="8" ry="5" fill="#A5493A"/>
    <path d="M-3-16c-2-6-6-9-10-10M3-16c2-6 6-9 10-10" stroke="#6F2B21" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
`),
);

// --- rodents: a rat at a hole in the skirting ---------------------------------
write(
  'rodents',
  svg(320, 220, `
  ${stage()}
  <rect x="40" y="146" width="252" height="36" rx="2" fill="#EDE3CF"/>
  <rect x="40" y="146" width="252" height="4" fill="${C.line}"/>
  <path d="M62 182v-18a20 20 0 0 1 40 0v18z" fill="#3A342C"/>
  <path d="M242 160c26 2 44-10 50-30" stroke="#B7AFA3" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="206" cy="156" rx="44" ry="26" fill="${C.stone}"/>
  <path d="M182 134c-18-2-38 8-56 24 16 8 38 12 58 8z" fill="${C.stone}"/>
  <circle cx="176" cy="130" r="12" fill="#A6A095"/><circle cx="176" cy="130" r="6.5" fill="${C.pink}"/>
  <circle cx="156" cy="146" r="3" fill="${C.ink}"/>
  <circle cx="127" cy="158" r="3.5" fill="${C.pink}"/>
  <path d="M132 156l-18-6M132 160l-20 2M134 163l-16 9" stroke="#6E6A62" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="180" cy="181" rx="9" ry="4" fill="${C.pink}"/><ellipse cx="226" cy="181" rx="9" ry="4" fill="${C.pink}"/>
  <g fill="${C.amberDark}"><circle cx="112" cy="176" r="3"/><circle cx="120" cy="180" r="2.2"/><circle cx="104" cy="181" r="2"/></g>
`),
);

// --- ants: a trail to a sugar cube --------------------------------------------
const ant = (x, y, a, s = 1) => `<use href="#ant" transform="translate(${x} ${y}) rotate(${a}) scale(${s})"/>`;
const trail = [
  [70, 152, 22], [104, 161, 6], [138, 162, -6], [170, 155, -18], [200, 143, -18], [230, 138, -2],
];
write(
  'ants',
  svg(320, 220, `
  <defs>
    <g id="ant">
      <path d="M-4-2l-4-7M-4 2l-4 7M0-2l1-8M0 2l1 8M3-2l6-6M3 2l6 6" stroke="#3A2A22" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <ellipse cx="-8" cy="0" rx="6" ry="4.5" fill="#3A2A22"/>
      <ellipse cx="0" cy="0" rx="3.5" ry="2.8" fill="#3A2A22"/>
      <circle cx="6" cy="0" r="3.6" fill="#3A2A22"/>
      <path d="M8-2c3-3 5-4 8-4M8 2c3 3 5 4 8 4" stroke="#3A2A22" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    </g>
  </defs>
  ${stage()}
  <path d="M52 146c40 30 90 22 130 2s50-8 78-4" stroke="#C7D4C4" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" fill="none"/>
  <g>${trail.map(([x, y, a]) => ant(x, y, a, 0.85)).join('')}</g>
  <path d="M252 116l28-10 20 14-28 12z" fill="#FFFFFF"/>
  <path d="M252 116l20 16v32l-20-16z" fill="#EDEAE2"/>
  <path d="M272 132l28-12v32l-28 12z" fill="#F7F5EF"/>
  <path d="M252 116l28-10 20 14-28 12zM252 116v32l20 16 28-12v-32" stroke="#D9D3C5" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
  ${ant(266, 124, 150, 0.9)}${ant(286, 150, 200, 0.9)}
  <g fill="${C.cream}"><circle cx="244" cy="170" r="2"/><circle cx="236" cy="176" r="1.6"/></g>
`),
);

// --- mosquitoes: a flower-pot plate holding water -----------------------------
write(
  'mosquitoes',
  svg(320, 220, `
  ${stage()}
  <circle cx="74" cy="64" r="16" fill="${C.butter}"/>
  <ellipse cx="134" cy="172" rx="62" ry="12" fill="#D2B79A"/>
  <ellipse cx="134" cy="169" rx="54" ry="8.5" fill="${C.sky}"/>
  <path d="M104 168c3-3 6 3 9 0M150 170c3-3 6 3 9 0M126 166c3-3 6 3 9 0" stroke="#5E7F92" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M104 118h60l-8 48h-44z" fill="${C.brick}"/>
  <rect x="100" y="112" width="68" height="12" rx="3" fill="#B5663E"/>
  <path d="M134 112c-4-26-18-40-34-44 4 18 16 34 34 44zM134 112c4-30 20-46 38-50-2 22-16 40-38 50zM134 112c0-24-2-44-4-56 10 12 12 36 4 56z" fill="${C.leaf}"/>
  <path d="M134 112c-8-18-18-30-28-38M134 112c8-20 20-34 32-44" stroke="${C.leafDark}" stroke-width="2" fill="none"/>
  <g transform="translate(222 86) rotate(-12) scale(1.45)">
    <ellipse cx="-6" cy="-14" rx="16" ry="7" fill="#DCE6EA" opacity=".85" transform="rotate(-30 -6 -14)"/>
    <ellipse cx="8" cy="-14" rx="16" ry="7" fill="#DCE6EA" opacity=".85" transform="rotate(24 8 -14)"/>
    <path d="M-6 4l-16 22M0 6l-4 28M8 4l14 24M-10 0l-26 8M12 0l24 12M-4 2l-20-4" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <ellipse cx="0" cy="0" rx="8" ry="5.5" fill="${C.ink}"/>
    <path d="M6 1c10 3 20 8 30 14" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
    <path d="M16 6l3 4M24 10l3 4M31 14l2 3" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="-9" cy="-2" r="5" fill="${C.ink}"/>
    <path d="M-13-3l-14-5" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/>
  </g>
`),
);

// --- hero: homes and an office, and a pest-control worker at a gate -----------
const windows = (x0, y0, cols, rows, dx, dy, w, h, fill) => {
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    s += `<rect x="${x0 + c * dx}" y="${y0 + r * dy}" width="${w}" height="${h}" rx="1.5" fill="${fill}"/>`;
  }
  return s;
};
const tree = (x, y, r) => `
  <rect x="${x - 4}" y="${y}" width="8" height="${r * 2.4}" rx="3" fill="#7A5A3A"/>
  <circle cx="${x}" cy="${y - r * 0.2}" r="${r}" fill="${C.leaf}"/>
  <circle cx="${x - r * 0.6}" cy="${y + r * 0.35}" r="${r * 0.7}" fill="${C.leafDark}"/>
  <circle cx="${x + r * 0.62}" cy="${y + r * 0.3}" r="${r * 0.72}" fill="${C.leaf}"/>`;

write(
  'hero',
  svg(1200, 460, `
  <path d="M40 380C20 200 220 70 600 64c380-6 590 110 560 316z" fill="${C.blob}"/>
  <circle cx="1060" cy="96" r="30" fill="${C.butter}"/>
  <g fill="#FFFFFF"><ellipse cx="250" cy="70" rx="44" ry="13"/><ellipse cx="282" cy="62" rx="26" ry="12"/><ellipse cx="770" cy="92" rx="40" ry="12"/><ellipse cx="800" cy="84" rx="24" ry="11"/></g>

  <!-- HDB block -->
  <rect x="96" y="112" width="236" height="268" fill="${C.sand}"/>
  <rect x="88" y="100" width="252" height="16" rx="3" fill="${C.brick}"/>
  ${Array.from({ length: 8 }, (_, r) => `<rect x="96" y="${150 + r * 26}" width="236" height="3" fill="${C.sandDark}"/>`).join('')}
  ${windows(108, 128, 6, 8, 37, 26, 22, 14, C.sky)}
  <rect x="96" y="340" width="236" height="40" fill="#D9C79F"/>
  ${[100, 146, 192, 238, 284, 318].map((x) => `<rect x="${x}" y="340" width="10" height="40" fill="${C.sand}"/>`).join('')}

  <!-- condo -->
  <rect x="368" y="72" width="128" height="308" fill="#DCE6EA"/>
  <rect x="362" y="62" width="140" height="14" rx="3" fill="${C.steel}"/>
  ${Array.from({ length: 12 }, (_, r) => `<rect x="376" y="${88 + r * 24}" width="112" height="12" rx="2" fill="${C.sky}"/><rect x="372" y="${101 + r * 24}" width="120" height="2.5" fill="${C.cream}"/>`).join('')}

  ${tree(530, 318, 26)}

  <!-- landed house -->
  <rect x="566" y="250" width="214" height="130" fill="${C.cream}"/>
  <path d="M552 256l121-60 121 60z" fill="${C.roof}"/>
  <rect x="566" y="312" width="214" height="4" fill="${C.line}"/>
  ${windows(584, 268, 4, 1, 50, 0, 32, 28, C.skyPale)}
  <rect x="592" y="330" width="34" height="26" rx="2" fill="${C.skyPale}"/>
  <rect x="720" y="330" width="34" height="26" rx="2" fill="${C.skyPale}"/>
  <rect x="654" y="326" width="38" height="54" rx="2" fill="#566247"/>
  <circle cx="684" cy="354" r="2.4" fill="${C.amber}"/>
  <rect x="548" y="362" width="250" height="4" fill="#7E8A76"/>
  ${Array.from({ length: 21 }, (_, i) => `<rect x="${550 + i * 12}" y="352" width="4" height="28" fill="#7E8A76"/>`).join('')}

  ${tree(830, 312, 30)}

  <!-- office -->
  <rect x="880" y="120" width="232" height="260" fill="${C.steel}"/>
  ${windows(892, 132, 8, 9, 27, 26, 21, 18, C.sky)}
  ${windows(919, 158, 3, 4, 81, 52, 21, 18, C.skyPale)}
  <rect x="960" y="352" width="72" height="28" fill="${C.skyPale}"/>
  <rect x="948" y="344" width="96" height="8" rx="2" fill="${C.ink}"/>

  <!-- ground -->
  <ellipse cx="600" cy="398" rx="590" ry="50" fill="#E7EBDF"/>
  <path d="M40 380h1120" stroke="#D5DCCB" stroke-width="4" stroke-linecap="round"/>

  <!-- pest-control worker with a sprayer and a clipboard -->
  <ellipse cx="592" cy="442" rx="36" ry="5" fill="#CFD6C8"/>
  <rect x="578" y="396" width="11" height="44" rx="4" fill="${C.greenDark}"/>
  <rect x="594" y="396" width="11" height="44" rx="4" fill="${C.greenDark}"/>
  <rect x="573" y="435" width="18" height="7" rx="3" fill="${C.ink}"/>
  <rect x="592" y="435" width="18" height="7" rx="3" fill="${C.ink}"/>
  <rect x="552" y="350" width="24" height="46" rx="9" fill="#D9DDD5"/>
  <rect x="556" y="344" width="16" height="8" rx="3" fill="#B5BCB0"/>
  <rect x="572" y="348" width="40" height="56" rx="13" fill="${C.green}"/>
  <rect x="566" y="358" width="11" height="36" rx="5" fill="${C.greenDark}"/>
  <path d="M562 396c-4 16 8 18 10-2" stroke="${C.steel}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M571 392l-26 18" stroke="#6E776A" stroke-width="4" stroke-linecap="round"/>
  <rect x="606" y="358" width="11" height="34" rx="5" fill="${C.green}"/>
  <rect x="608" y="368" width="24" height="30" rx="3" fill="${C.sand}" stroke="${C.roof}" stroke-width="2"/>
  <path d="M613 378h14M613 384h14M613 390h9" stroke="${C.woodDark}" stroke-width="2"/>
  <circle cx="592" cy="330" r="15" fill="${C.skin1}"/>
  <path d="M576 329a16 16 0 0 1 32 0z" fill="${C.amber}"/>
  <rect x="592" y="325" width="22" height="5" rx="2" fill="${C.amberDark}"/>

  <!-- resident at the gate -->
  <ellipse cx="702" cy="442" rx="32" ry="5" fill="#CFD6C8"/>
  <rect x="690" y="398" width="10" height="42" rx="4" fill="${C.inkSoft}"/>
  <rect x="704" y="398" width="10" height="42" rx="4" fill="${C.inkSoft}"/>
  <rect x="686" y="435" width="16" height="7" rx="3" fill="${C.ink}"/>
  <rect x="703" y="435" width="16" height="7" rx="3" fill="${C.ink}"/>
  <rect x="684" y="352" width="36" height="52" rx="13" fill="${C.pink}"/>
  <rect x="676" y="360" width="10" height="32" rx="5" fill="${C.pink}"/>
  <path d="M718 364l18-14" stroke="${C.pink}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="740" cy="347" r="5" fill="${C.skin2}"/>
  <circle cx="702" cy="334" r="14" fill="${C.skin2}"/>
  <path d="M688 333a14 14 0 0 1 28 0c-5-6-22-7-28 0z" fill="${C.ink}"/>
`),
);

// --- skyline strip, tiled above the footer -------------------------------------
write(
  'skyline',
  svg(480, 64, `
  <g fill="#DCE6DA">
    <rect x="0" y="22" width="54" height="42"/><rect x="60" y="8" width="40" height="56"/>
    <rect x="108" y="30" width="70" height="34"/><path d="M186 64V38l30-16 30 16v26z"/>
    <rect x="254" y="14" width="46" height="50"/><rect x="306" y="34" width="62" height="30"/>
    <rect x="374" y="4" width="36" height="60"/><rect x="416" y="26" width="64" height="38"/>
  </g>
  <g fill="#CFDCCD">
    <circle cx="104" cy="50" r="10"/><circle cx="250" cy="52" r="9"/><circle cx="412" cy="50" r="10"/>
  </g>
`),
);

console.log(`illustrations written to ${out}`);
