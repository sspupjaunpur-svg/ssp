import about from "@/data/about.json";
import constitution from "@/data/constitution.json";
import contact from "@/data/contact.json";
import donate from "@/data/donate.json";
import eligibility from "@/data/eligibility.json";
import events from "@/data/events.json";
import index from "@/data/index.json";
import join from "@/data/join.json";
import leadership from "@/data/leadership.json";
import media from "@/data/media.json";
import membershipCard from "@/data/membershipCard.json";
import news from "@/data/news.json";
import organization from "@/data/organization.json";
import partyWings from "@/data/partyWings.json";
import privacyPolicy from "@/data/privacyPolicy.json";
import rebuildingPlan from "@/data/rebuildingPlan.json";
import roleModels from "@/data/roleModels.json";
import terms from "@/data/terms.json";
import vision from "@/data/vision.json";

export type Block = string[];

const files = {
  about, constitution, contact, donate, eligibility, events, index, join, leadership, media,
  membershipCard, news, organization, partyWings, privacyPolicy, rebuildingPlan, roleModels, terms, vision,
} as unknown as Record<string, Block[]>;

export function localSrc(src: string) {
  return src
    .replace("https://sarvjansanatanparty.org/views/basic/assets/images/", "/images/")
    .replace("https://sarvjansanatanparty.org/restful/public/uploads/", "/uploads/");
}

export function raw(name: string): Block[] {
  return files[name].map((b) => (b[0] === "img" ? ["img", localSrc(b[1]), b[2] ?? ""] : b));
}

/** Generic page: block 1 = h1, then li crumbs, then content. */
export function page(name: string) {
  const d = raw(name);
  let i = 2;
  const crumbs: string[] = [];
  while (d[i]?.[0] === "li") crumbs.push(d[i++][1]);
  return { title: d[1][1], crumbs, blocks: d.slice(i) };
}

export type Post = { slug: string; title: string; date: string; image: string };

const NEWS_SLUGS = [
  "national-president-addresses-the-youth-convention-9",
  "massive-turnout-our-recent-public-rally-in-uttar-pradesh-7",
  "party-workers-organize-nationwide-cleanliness-drive-6",
  "national-president-addresses-the-youth-convention-1",
];
const EVENT_SLUGS = [
  "national-president-addresses-the-youth-convention-upcoming-event-4",
  "national-president-addresses-the-youth-convention-3",
  "massive-turnout-our-recent-public-rally-in-uttar-pradesh-2",
  "party-workers-organize-nationwide-cleanliness-drive-1",
];

function posts(name: string, slugs: string[]): Post[] {
  const b = page(name).blocks;
  const out: Post[] = [];
  for (let i = 0; i + 2 < b.length; i++) {
    if (b[i][0] === "img" && b[i + 2][0] === "h3") {
      out.push({ slug: slugs[out.length], image: b[i][1], date: b[i + 1][1], title: b[i + 2][1] });
      i += 2;
    }
  }
  return out.filter((p) => p.slug);
}

export const newsPosts = posts("news", NEWS_SLUGS);
export const eventPosts = posts("events", EVENT_SLUGS);

export const newsBody =
  "The programme witnessed active participation from party members, supporters and the public. The event focused on strengthening community engagement and working towards a better future. During the event, important discussions were held on social development, public participation and the party's future initiatives. The gathering provided an opportunity for members and supporters to exchange ideas, share their views and work together towards building a stronger and united society.";

const g = (id: string) => `/uploads/gallery/images/image_${id}.jpg`;
export const albums = [
  { slug: "party-event-7", title: "Party Event", thumb: "/uploads/gallery/thumbnails/image_3380455423.jpg",
    images: ["1695403411", "2115975516", "3343432583", "4250635131", "8590402476"].map(g) },
  { slug: "party-meeting-5", title: "Party Meeting", thumb: "/uploads/gallery/thumbnails/image_5417812364.jpg",
    images: ["1976628476", "4991144255", "6172616158", "8907518113"].map(g) },
  { slug: "national-youth-convention-4", title: "National Youth Convention", thumb: "/uploads/gallery/thumbnails/image_1412429205.jpg",
    images: ["2770944509", "3852746122", "6625200663", "732694265"].map(g) },
  { slug: "party-activities-3", title: "Party Activities", thumb: "/uploads/gallery/thumbnails/image_7566345724.jpg",
    images: ["244323807", "3927048471", "6720125389", "6847406156"].map(g) },
];

export const videos = [
  { title: "Party rules", id: "jj5mtfPicxg" },
  { title: "party Halchal", id: "csn0aTgnnmc" },
  { title: "Public Rally – Uttar Pradesh", id: "csn0aTgnnmc" },
];
