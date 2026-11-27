export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About", href: "/about", children: [
      { label: "About Us", href: "/about" },
      { label: "Our Role Models", href: "/roleModels" },
      { label: "Our Leadership", href: "/leadership" },
      { label: "Our Vision", href: "/vision" },
      { label: "Organizational Structure", href: "/organization" },
      { label: "Party Wings", href: "/partyWings" },
      { label: "Party Constitution", href: "/constitution" },
    ],
  },
  { label: "Bharat Rebuilding Plan", href: "/rebuildingPlan" },
  { label: "Media", href: "/media" },
  {
    label: "Get Involved", href: "/join", children: [
      { label: "Eligibility", href: "/eligibility" },
      { label: "Become a Member / Internship / Volunteer", href: "/join" },
      { label: "Download Membership Card", href: "/membershipCard" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
