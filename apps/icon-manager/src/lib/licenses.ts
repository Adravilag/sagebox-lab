/**
 * License templates for icon sets
 * Each icon set has its own license that must be included when distributing icons
 */

export interface LicenseInfo {
  type: string;
  name: string;
  url: string;
  text: string;
  attribution?: string;
}

// Full license texts
const MIT_LICENSE = `MIT License

Copyright (c) [year] [copyright holders]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const ISC_LICENSE = `ISC License

Copyright (c) [year] [copyright holders]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;

const APACHE_2_LICENSE = `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by
the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all
other entities that control, are controlled by, or are under common
control with that entity.

"You" (or "Your") shall mean an individual or Legal Entity
exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications.

"Object" form shall mean any form resulting from mechanical
transformation or translation of a Source form.

"Work" shall mean the work of authorship made available under the License.

"Derivative Works" shall mean any work that is based on the Work.

"Contribution" shall mean any work of authorship submitted to the Licensor.

"Contributor" shall mean Licensor and any Legal Entity on behalf of whom
a Contribution has been received by Licensor.

2. Grant of Copyright License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
copyright license to reproduce, prepare Derivative Works of,
publicly display, publicly perform, sublicense, and distribute the
Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
this License, each Contributor hereby grants to You a perpetual,
worldwide, non-exclusive, no-charge, royalty-free, irrevocable
patent license to make, have made, use, offer to sell, sell, import,
and otherwise transfer the Work.

4. Redistribution. You may reproduce and distribute copies of the
Work or Derivative Works thereof in any medium, with or without
modifications, and in Source or Object form, provided that You
meet the following conditions:

(a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

(b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

(c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work; and

(d) If the Work includes a "NOTICE" text file, You must include
    a readable copy of the attribution notices contained within
    such NOTICE file.

5. Submission of Contributions. Unless You explicitly state otherwise,
any Contribution intentionally submitted for inclusion in the Work
by You to the Licensor shall be under the terms and conditions of
this License, without any additional terms or conditions.

6. Trademarks. This License does not grant permission to use the trade
names, trademarks, service marks, or product names of the Licensor.

7. Disclaimer of Warranty. Unless required by applicable law or
agreed to in writing, Licensor provides the Work on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.

8. Limitation of Liability. In no event shall any Contributor be
liable to You for any damages, including any direct, indirect, special,
incidental, or consequential damages.

9. Accepting Warranty or Additional Liability. While redistributing
the Work or Derivative Works thereof, You may choose to offer,
and charge a fee for, acceptance of support, warranty, indemnity,
or other liability obligations.

END OF TERMS AND CONDITIONS`;

const CC_BY_4_LICENSE = `Creative Commons Attribution 4.0 International (CC BY 4.0)

This is a human-readable summary of (and not a substitute for) the license.
https://creativecommons.org/licenses/by/4.0/legalcode

You are free to:

  Share — copy and redistribute the material in any medium or format
  Adapt — remix, transform, and build upon the material
  for any purpose, even commercially.

The licensor cannot revoke these freedoms as long as you follow the
license terms.

Under the following terms:

  Attribution — You must give appropriate credit, provide a link to the
  license, and indicate if changes were made. You may do so in any
  reasonable manner, but not in any way that suggests the licensor
  endorses you or your use.

  No additional restrictions — You may not apply legal terms or
  technological measures that legally restrict others from doing
  anything the license permits.

Notices:

  You do not have to comply with the license for elements of the
  material in the public domain or where your use is permitted by
  an applicable exception or limitation.

  No warranties are given. The license may not give you all of the
  permissions necessary for your intended use. For example, other
  rights such as publicity, privacy, or moral rights may limit how
  you use the material.`;

// Icon set specific license information
export const ICON_SET_LICENSES: Record<string, LicenseInfo> = {
  'lucide': {
    type: 'ISC',
    name: 'Lucide Icons',
    url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
    text: ISC_LICENSE.replace('[year]', '2020').replace('[copyright holders]', 'Lucide Contributors'),
    attribution: 'Lucide Icons - https://lucide.dev'
  },
  'heroicons': {
    type: 'MIT',
    name: 'Heroicons',
    url: 'https://github.com/tailwindlabs/heroicons/blob/master/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2020').replace('[copyright holders]', 'Tailwind Labs, Inc.'),
    attribution: 'Heroicons by Tailwind Labs - https://heroicons.com'
  },
  'material-symbols': {
    type: 'Apache 2.0',
    name: 'Material Symbols',
    url: 'https://github.com/google/material-design-icons/blob/master/LICENSE',
    text: APACHE_2_LICENSE,
    attribution: 'Material Symbols by Google - https://fonts.google.com/icons'
  },
  'tabler': {
    type: 'MIT',
    name: 'Tabler Icons',
    url: 'https://github.com/tabler/tabler-icons/blob/master/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2020-2024').replace('[copyright holders]', 'Paweł Kuna'),
    attribution: 'Tabler Icons by Paweł Kuna - https://tabler.io/icons'
  },
  'feather': {
    type: 'MIT',
    name: 'Feather Icons',
    url: 'https://github.com/feathericons/feather/blob/master/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2013-2023').replace('[copyright holders]', 'Cole Bemis'),
    attribution: 'Feather Icons by Cole Bemis - https://feathericons.com'
  },
  'mdi': {
    type: 'Apache 2.0',
    name: 'Material Design Icons',
    url: 'https://github.com/Templarian/MaterialDesign/blob/master/LICENSE',
    text: APACHE_2_LICENSE,
    attribution: 'Material Design Icons - https://materialdesignicons.com'
  },
  'bi': {
    type: 'MIT',
    name: 'Bootstrap Icons',
    url: 'https://github.com/twbs/icons/blob/main/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2019-2024').replace('[copyright holders]', 'The Bootstrap Authors'),
    attribution: 'Bootstrap Icons - https://icons.getbootstrap.com'
  },
  'carbon': {
    type: 'Apache 2.0',
    name: 'Carbon Icons',
    url: 'https://github.com/carbon-design-system/carbon/blob/main/LICENSE',
    text: APACHE_2_LICENSE,
    attribution: 'Carbon Icons by IBM - https://carbondesignsystem.com/guidelines/icons/library'
  },
  'ph': {
    type: 'MIT',
    name: 'Phosphor Icons',
    url: 'https://github.com/phosphor-icons/core/blob/main/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2020').replace('[copyright holders]', 'Phosphor Icons'),
    attribution: 'Phosphor Icons - https://phosphoricons.com'
  },
  'ion': {
    type: 'MIT',
    name: 'Ionicons',
    url: 'https://github.com/ionic-team/ionicons/blob/main/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2015-present').replace('[copyright holders]', 'Ionic'),
    attribution: 'Ionicons by Ionic - https://ionic.io/ionicons'
  },
  'ri': {
    type: 'Apache 2.0',
    name: 'Remix Icon',
    url: 'https://github.com/Remix-Design/RemixIcon/blob/master/License',
    text: APACHE_2_LICENSE,
    attribution: 'Remix Icon - https://remixicon.com'
  },
  'solar': {
    type: 'CC BY 4.0',
    name: 'Solar Icons',
    url: 'https://www.figma.com/community/file/1166831539721848736',
    text: CC_BY_4_LICENSE,
    attribution: 'Solar Icons by 480 Design - https://www.figma.com/community/file/1166831539721848736'
  },
  'fa6-solid': {
    type: 'CC BY 4.0',
    name: 'Font Awesome 6 (Solid)',
    url: 'https://fontawesome.com/license/free',
    text: CC_BY_4_LICENSE,
    attribution: 'Font Awesome Free - https://fontawesome.com (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT)'
  },
  'fa6-regular': {
    type: 'CC BY 4.0',
    name: 'Font Awesome 6 (Regular)',
    url: 'https://fontawesome.com/license/free',
    text: CC_BY_4_LICENSE,
    attribution: 'Font Awesome Free - https://fontawesome.com (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT)'
  },
  'radix-icons': {
    type: 'MIT',
    name: 'Radix Icons',
    url: 'https://github.com/radix-ui/icons/blob/master/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2022').replace('[copyright holders]', 'WorkOS'),
    attribution: 'Radix Icons by WorkOS - https://www.radix-ui.com/icons'
  },
  'eos-icons': {
    type: 'MIT',
    name: 'EOS Icons',
    url: 'https://github.com/SUSE-UIUX/eos-icons/blob/master/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2019').replace('[copyright holders]', 'SUSE LLC'),
    attribution: 'EOS Icons by SUSE - https://eos-icons.com'
  },
  'svg-spinners': {
    type: 'MIT',
    name: 'SVG Spinners',
    url: 'https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE',
    text: MIT_LICENSE.replace('[year]', '2022').replace('[copyright holders]', 'Utkarsh Verma'),
    attribution: 'SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners'
  },
  'line-md': {
    type: 'MIT',
    name: 'Line MD Icons',
    url: 'https://github.com/cyberalien/line-md/blob/master/license.txt',
    text: MIT_LICENSE.replace('[year]', '2021').replace('[copyright holders]', 'Vjacheslav Trushkin'),
    attribution: 'Line MD by Vjacheslav Trushkin - https://github.com/cyberalien/line-md'
  }
};

/**
 * Generate a combined license file for all used icon sets
 */
export function generateLicenseFile(usedPrefixes: string[]): string {
  const uniquePrefixes = [...new Set(usedPrefixes)];
  const lines: string[] = [
    '# Icon Licenses',
    '',
    'This project uses icons from the following icon sets. Each icon set has its own license that must be respected.',
    '',
    '---',
    ''
  ];

  for (const prefix of uniquePrefixes) {
    const license = ICON_SET_LICENSES[prefix];
    if (license) {
      lines.push(
        `## ${license.name}`,
        '',
        `**License:** ${license.type}`,
        `**URL:** ${license.url}`
      );
      if (license.attribution) {
        lines.push(`**Attribution:** ${license.attribution}`);
      }
      lines.push(
        '',
        '```',
        license.text,
        '```',
        '',
        '---',
        ''
      );
    }
  }

  return lines.join('\n');
}

/**
 * Generate individual license files for each icon set
 */
export function generateIndividualLicenses(usedPrefixes: string[]): Record<string, string> {
  const licenses: Record<string, string> = {};
  const uniquePrefixes = [...new Set(usedPrefixes)];

  for (const prefix of uniquePrefixes) {
    const license = ICON_SET_LICENSES[prefix];
    if (license) {
      const content = [
        license.name,
        '='.repeat(license.name.length),
        '',
        `License: ${license.type}`,
        `Source: ${license.url}`,
        license.attribution ? `Attribution: ${license.attribution}` : '',
        '',
        '-'.repeat(60),
        '',
        license.text
      ].filter(Boolean).join('\n');

      licenses[`LICENSE-${prefix.toUpperCase()}`] = content;
    }
  }

  return licenses;
}

/**
 * Get attribution text for footer/credits
 */
export function getAttributionText(usedPrefixes: string[]): string {
  const uniquePrefixes = [...new Set(usedPrefixes)];
  const attributions: string[] = [];

  for (const prefix of uniquePrefixes) {
    const license = ICON_SET_LICENSES[prefix];
    if (license?.attribution) {
      attributions.push(license.attribution);
    }
  }

  return attributions.join('\n');
}
