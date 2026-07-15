import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  defaultSiteContent,
  type ContentCard,
  type EducationPageContent,
  type EmploymentPageContent,
  type GalleryImage,
  type HeroFact,
  type PageIntroContent,
  type SiteContent,
  type TourismPageContent,
  type VideoSlot,
} from '../src/types/siteContent';
import { normalizeLocalizedText } from '../src/types/localized';

const dataFile = path.resolve(
  process.env.SITE_CONTENT_FILE || path.join(process.cwd(), 'data/site-content.json'),
);
const dataDirectory = path.dirname(dataFile);

let mutationQueue = Promise.resolve();

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeContent(defaultSiteContent);
  }
}

async function writeContent(content: SiteContent) {
  const temporaryFile = `${dataFile}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  await rename(temporaryFile, dataFile);
}

function cleanText(value: unknown, fallback: string, maxLength = 220) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text ? text.slice(0, maxLength) : fallback;
}

function cleanUrl(value: unknown, fallback: string) {
  const text = typeof value === 'string' ? value.trim() : '';

  if (!text) return fallback;
  if (text.startsWith('/') || /^https?:\/\//i.test(text)) return text;

  return fallback;
}

function normalizeFact(value: unknown, fallback: HeroFact): HeroFact {
  const fact = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    value: cleanText(fact.value, fallback.value, 20),
    label: normalizeLocalizedText(fact.label, fallback.label, 80),
  };
}

function normalizeVideo(value: unknown, fallback: VideoSlot): VideoSlot {
  const video = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    title: normalizeLocalizedText(video.title, fallback.title, 120),
    label: normalizeLocalizedText(video.label, fallback.label, 80),
    image: cleanUrl(video.image, fallback.image),
    videoUrl: cleanUrl(video.videoUrl, fallback.videoUrl),
    enabled: video.enabled !== false,
  };
}

function normalizeGalleryImage(value: unknown, fallback: GalleryImage): GalleryImage {
  const image = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    src: cleanUrl(image.src, fallback.src),
    alt: normalizeLocalizedText(image.alt, fallback.alt, 160),
  };
}

function normalizePageIntro(value: unknown, fallback: PageIntroContent): PageIntroContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    eyebrow: normalizeLocalizedText(input.eyebrow, fallback.eyebrow, 80),
    title: normalizeLocalizedText(input.title, fallback.title, 180),
    description: normalizeLocalizedText(input.description, fallback.description, 320),
    image: cleanUrl(input.image, fallback.image),
  };
}

function normalizeCard(value: unknown, fallback: ContentCard): ContentCard {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    title: normalizeLocalizedText(input.title, fallback.title, 120),
    text: normalizeLocalizedText(input.text, fallback.text, 280),
  };
}

function normalizeLocalizedList(values: unknown, fallbacks: string[] | ReturnType<typeof normalizeLocalizedText>[]) {
  const list = Array.isArray(values) ? values : [];
  return fallbacks.map((fallback, index) => normalizeLocalizedText(list[index], fallback, 220));
}

function normalizeTourismContent(value: unknown, fallback: TourismPageContent): TourismPageContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    intro: normalizePageIntro(input.intro, fallback.intro),
    highlights: normalizeLocalizedList(input.highlights, fallback.highlights),
    benefits: fallback.benefits.map((item, index) => normalizeCard(Array.isArray(input.benefits) ? input.benefits[index] : undefined, item)),
    formatsTitle: normalizeLocalizedText(input.formatsTitle, fallback.formatsTitle, 80),
    formatsLead: normalizeLocalizedText(input.formatsLead, fallback.formatsLead, 120),
    formats: normalizeLocalizedList(input.formats, fallback.formats),
    routeTitle: normalizeLocalizedText(input.routeTitle, fallback.routeTitle, 80),
    routeSteps: fallback.routeSteps.map((item, index) => normalizeCard(Array.isArray(input.routeSteps) ? input.routeSteps[index] : undefined, item)),
    cityImage: cleanUrl(input.cityImage, fallback.cityImage),
    natureImage: cleanUrl(input.natureImage, fallback.natureImage),
    packageTitle: normalizeLocalizedText(input.packageTitle, fallback.packageTitle, 220),
    packageLead: normalizeLocalizedText(input.packageLead, fallback.packageLead, 320),
    packageItems: fallback.packageItems.map((item, index) => normalizeCard(Array.isArray(input.packageItems) ? input.packageItems[index] : undefined, item)),
    packageNoteTitle: normalizeLocalizedText(input.packageNoteTitle, fallback.packageNoteTitle, 80),
    packageNoteText: normalizeLocalizedText(input.packageNoteText, fallback.packageNoteText, 220),
  };
}

function normalizeEmploymentContent(value: unknown, fallback: EmploymentPageContent): EmploymentPageContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    intro: normalizePageIntro(input.intro, fallback.intro),
    countries: normalizeLocalizedList(input.countries, fallback.countries),
    advantages: fallback.advantages.map((item, index) => normalizeCard(Array.isArray(input.advantages) ? input.advantages[index] : undefined, item)),
    processTitle: normalizeLocalizedText(input.processTitle, fallback.processTitle, 80),
    steps: normalizeLocalizedList(input.steps, fallback.steps),
    supportTitle: normalizeLocalizedText(input.supportTitle, fallback.supportTitle, 80),
    supportIntro: normalizeLocalizedList(input.supportIntro, fallback.supportIntro),
    supportItems: normalizeLocalizedList(input.supportItems, fallback.supportItems),
    supportOutro: normalizeLocalizedList(input.supportOutro, fallback.supportOutro),
    supportImage: cleanUrl(input.supportImage, fallback.supportImage),
  };
}

function normalizeEducationContent(value: unknown, fallback: EducationPageContent): EducationPageContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    intro: normalizePageIntro(input.intro, fallback.intro),
    benefits: fallback.benefits.map((item, index) => normalizeCard(Array.isArray(input.benefits) ? input.benefits[index] : undefined, item)),
    tracks: fallback.tracks.map((item, index) => normalizeCard(Array.isArray(input.tracks) ? input.tracks[index] : undefined, item)),
    formatsTitle: normalizeLocalizedText(input.formatsTitle, fallback.formatsTitle, 80),
    formatsLead: normalizeLocalizedText(input.formatsLead, fallback.formatsLead, 120),
    formats: normalizeLocalizedList(input.formats, fallback.formats),
    note: normalizeLocalizedText(input.note, fallback.note, 280),
  };
}

export function normalizeSiteContent(value: unknown): SiteContent {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const hero = input.hero && typeof input.hero === 'object' ? input.hero as Record<string, unknown> : {};

  const facts = Array.isArray(hero.facts) ? hero.facts : [];
  const videos = Array.isArray(input.videos) ? input.videos : [];
  const gallery = Array.isArray(input.gallery) ? input.gallery : [];

  return {
    hero: {
      eyebrow: normalizeLocalizedText(hero.eyebrow, defaultSiteContent.hero.eyebrow, 120),
      title: normalizeLocalizedText(hero.title, defaultSiteContent.hero.title, 180),
      subtitle: normalizeLocalizedText(hero.subtitle, defaultSiteContent.hero.subtitle, 240),
      primaryCta: normalizeLocalizedText(hero.primaryCta, defaultSiteContent.hero.primaryCta, 40),
      secondaryCta: normalizeLocalizedText(hero.secondaryCta, defaultSiteContent.hero.secondaryCta, 40),
      whatsappLabel: normalizeLocalizedText(hero.whatsappLabel, defaultSiteContent.hero.whatsappLabel, 40),
      facts: defaultSiteContent.hero.facts.map((fallback, index) => normalizeFact(facts[index], fallback)),
    },
    videos: videos
      .map((video, index) => normalizeVideo(video, defaultSiteContent.videos[index] || defaultSiteContent.videos[0]))
      .filter((video) => video.title || video.image || video.videoUrl)
      .slice(0, 8),
    gallery: gallery
      .map((image, index) => normalizeGalleryImage(image, defaultSiteContent.gallery[index] || defaultSiteContent.gallery[0]))
      .filter((image) => image.src)
      .slice(0, 24),
    tourism: normalizeTourismContent(input.tourism, defaultSiteContent.tourism),
    employment: normalizeEmploymentContent(input.employment, defaultSiteContent.employment),
    education: normalizeEducationContent(input.education, defaultSiteContent.education),
  };
}

export async function getSiteContent() {
  await ensureStore();
  const contents = await readFile(dataFile, 'utf8');
  return normalizeSiteContent(JSON.parse(contents));
}

export function updateSiteContent(input: SiteContent) {
  const operation = mutationQueue.then(async () => {
    const content = normalizeSiteContent(input);
    await ensureStore();
    await writeContent(content);
    return content;
  });

  mutationQueue = operation.then(
    () => undefined,
    () => undefined,
  );
  return operation;
}
