<?php
/* Everything that makes this installation Equinix rather than one of the other
 * three academies.
 *
 * THIS IS THE ONLY PER-SITE PHP FILE. Every other .php file in this repository
 * is shared verbatim with SPS, Fungi and the rest, and is written here by
 * tools/sync-backend.php in the SPS repository, which overwrites without
 * asking. It refuses to touch this one.
 *
 * So: if you want to edit a page because "Equinix says X and SPS says Y", the
 * answer is a new key in here and brand('key') in the shared page — added to SPS
 * and synced back out. Edit the page here instead and the next sync reverts you.
 *
 * Nothing secret belongs here — this file is deployed into the web root with
 * everything else. Credentials live in ~/private/equinixacademy-config.php.
 */

return [

  /* The academy, and the company whose academy it is. */
  'academy'       => 'Equinix Academy',
  'company'       => 'Equinix',

  /* Used mid-sentence — "for Equinix employees", "Fully funded by Equinix". */
  'company_short' => 'Equinix',

  /* Relative to the site root. Each academy keeps its logo where its static
     pages already reference it — do not "tidy" the paths to match each other,
     because those pages are not part of this application and moving the file
     breaks them. */
  'logo'          => 'equinix-logo.jpg',
  'logo_alt'      => 'Equinix',

  /* Centenary runs the academy for all four companies, so registrations and
     reset notifications go to Centenary, not to the client. */
  'academy_email'   => 'kgomotso@centenarynetworks.com',

  /* Optional. Fungi publishes a second, company-side address; this site does
     not, so the line is omitted rather than rendered blank. */
  'enquiries_email' => '',

  /* PLACEHOLDER — carried over from the static site, where it was also a
     placeholder. It needs Equinix's real switchboard before anyone is told
     the site is finished, or a learner will dial it. */
  'phone'         => '012 345 6789',
  'phone_href'    => '0123456789',
  'office_hours'  => 'Monday–Friday, 08:00–17:00 SAST',

  /* Placeholder text in the registration form.
     Carried over from the static site. */
  'empno_example' => 'e.g. EQ1234',
  'dept_example'  => 'e.g. Operations, Network, Field Engineering',

  /* Centenary Networks' accreditation, not the client's. Identical on all four
     sites because it is one accreditation held by one provider. */
  'accred_no'     => '07-QCTO/SDP180526182035',
  'accred_valid'  => '15 May 2026 – 14 May 2031',

  /* Bumped on any release that changes styles.css or a .js file.
     See asset() in lib/chrome.php for why this is not optional. */
  'asset_version' => '20260818',
];
