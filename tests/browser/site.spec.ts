import { readFile } from "node:fs/promises";
import { expect, test, type Locator } from "@playwright/test";
import type { Post } from "../../lib/content";

const postsByLocale = JSON.parse(
  await readFile(".generated/posts.json", "utf8"),
) as Record<"en" | "it" | "de", Post[]>;
const posts = postsByLocale.en;
const videoPost = posts.find((post) => post.videoId);

async function waitForHydration(control: Locator) {
  await expect
    .poll(() =>
      control.evaluate((element) =>
        Object.keys(element).some((key) => key.startsWith("__reactProps$")),
      ),
    )
    .toBe(true);
}

test("root route uses device preferred language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "de-DE" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/de\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await context.close();
});

test("root route falls back to English for unsupported device languages", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "fr-FR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/$/);
  await context.close();
});

test("saved language takes priority over device language", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "de-DE" });
  await context.addInitScript(() =>
    localStorage.setItem("alexxeon-language", "it"),
  );
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/it\/$/);
  await context.close();
});

test("preferences save language and use it for the root route", async ({
  page,
}) => {
  await page.goto("/en/preferences/");
  await page.getByRole("combobox", { name: "Language" }).selectOption("it");
  await expect(page).toHaveURL(/\/it\/preferences\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await page.goto("/");
  await expect(page).toHaveURL(/\/it\/$/);
});

test("mobile navigation opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");

  const menu = page.getByRole("button", { name: "Menu" });
  const navigation = page.locator("#main-navigation");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).toHaveCSS("visibility", "hidden");
  await expect(navigation).toHaveAttribute("aria-hidden", "true");
  await expect(navigation).toHaveAttribute("inert", "");
  const menuSize = await menu.evaluate((element) => {
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
  });
  expect(menuSize.width).toBeGreaterThanOrEqual(44);
  expect(menuSize.height).toBeGreaterThanOrEqual(44);
  await waitForHydration(menu);
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(navigation).toHaveCSS("visibility", "visible");
  await expect(navigation).toHaveAttribute("aria-hidden", "false");
  await expect(navigation).toHaveCSS("opacity", "1");
  await expect(navigation).toHaveCSS("transition-duration", /0\.24s/);
  await expect(page.getByRole("link", { name: "Preferences" })).toBeVisible();
  await page.getByRole("link", { name: "Bio" }).click();
  await expect(page).toHaveURL(/\/en\/bio\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("mobile touch taps activate portrait navigation links", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/en/");

  const menu = page.getByRole("button", { name: "Menu" });
  await waitForHydration(menu);
  await menu.tap();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  const bioLink = page.getByRole("link", { name: "Bio" });
  const initialPosition = await bioLink.boundingBox();
  await page.waitForTimeout(80);
  const positionDuringAnimation = await bioLink.boundingBox();
  expect(positionDuringAnimation?.y).toBe(initialPosition?.y);
  await bioLink.tap();
  await expect(page).toHaveURL(/\/en\/bio\/$/);
  await context.close();
});

test("landscape touch taps activate visible navigation links", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 844, height: 390 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/en/");

  const navigation = page.locator("#main-navigation");
  const bioLink = page.getByRole("link", { name: "Bio" });
  await expect(navigation).not.toHaveAttribute("inert", "");
  await expect(navigation).not.toHaveAttribute("aria-hidden", "true");
  await bioLink.tap();
  await expect(page).toHaveURL(/\/en\/bio\/$/);
  await context.close();
});

test("keyboard users can skip content and dismiss mobile navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");

  const menu = page.getByRole("button", { name: "Menu" });
  await waitForHydration(menu);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);

  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Bio" }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveCSS("outline-width", "3px");
});

test("mobile header stays pinned while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");

  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
    "content",
    /viewport-fit=cover/,
  );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(7, 94, 84)",
  );
  const header = page.locator(".site-header");
  await expect(header).toHaveCSS("background-color", "rgb(0, 121, 110)");
  await expect(header).toHaveCSS("position", "fixed");
  await expect(header).toHaveCSS(
    "box-shadow",
    /rgba\(0, 72, 64, 0\.18\).*rgba\(0, 72, 64, 0\.12\)/,
  );
  await expect(page.locator(".navigation")).toHaveCSS("visibility", "hidden");
  const headerHeight = await header.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  const spacerHeight = await page
    .locator(".site-header-spacer")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(spacerHeight).toBe(headerHeight);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect
    .poll(() =>
      header.evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBe(0);
});

test("landscape header respects horizontal safe areas without changing desktop layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/en/");
  const header = page.locator(".site-header");
  await expect(header).toHaveCSS("position", "relative");
  const landscapePadding = await header.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  expect(landscapePadding).toBeGreaterThanOrEqual(24);
  const homeSection = page.locator("#music");
  const firstCard = page.locator(".card").first();
  const sectionPadding = await homeSection.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  const cardLeft = await firstCard.evaluate(
    (element) => element.getBoundingClientRect().left,
  );
  const sectionLeft = await homeSection.evaluate(
    (element) => element.getBoundingClientRect().left,
  );
  expect(cardLeft).toBeGreaterThanOrEqual(sectionLeft + sectionPadding);

  await page.goto("/en/bio/");
  const bioSection = page.locator("main.bio");
  const bioPadding = await bioSection.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  const firstPhotoLeft = await page
    .locator(".photo-grid img")
    .first()
    .evaluate((element) => element.getBoundingClientRect().left);
  const bioLeft = await bioSection.evaluate(
    (element) => element.getBoundingClientRect().left,
  );
  expect(firstPhotoLeft).toBeGreaterThanOrEqual(bioLeft + bioPadding);
  await expect(page.locator(".photo-grid .photo-image").first()).toHaveCSS(
    "box-shadow",
    /rgba\(6, 75, 67, 0\.12\).*rgba\(6, 75, 67, 0\.2\)/,
  );

  await page.setViewportSize({ width: 1280, height: 800 });
  const desktopPadding = await header.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  expect(desktopPadding).toBe(60);
});

test("music cards have a subtle shadow", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator(".card").first()).toHaveCSS(
    "background-color",
    "rgb(250, 249, 246)",
  );
  await expect(page.locator(".card").first()).toHaveCSS(
    "box-shadow",
    /rgba\(6, 75, 67, 0\.1\).*rgba\(6, 75, 67, 0\.18\)/,
  );
});

test("theme selector supports system preference and saved overrides", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en/preferences/");

  const theme = page.getByRole("combobox", { name: "Theme" });
  const card = page.locator(".preferences__controls");
  await expect(theme).toHaveValue("system");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(7, 94, 84)",
  );

  await theme.selectOption("dark");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(9, 45, 41)",
  );
  await expect(card).toHaveCSS("background-color", "rgb(23, 62, 56)");
  await page.reload();
  await expect(theme).toHaveValue("dark");

  await theme.selectOption("system");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(9, 45, 41)",
  );
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(7, 94, 84)",
  );
});

test("image loading shows shimmer then branded fallback on failure", async ({
  page,
}) => {
  let releaseImageRequest = () => {};
  const imageRequestGate = new Promise<void>((resolve) => {
    releaseImageRequest = resolve;
  });
  await page.route("**/hqdefault.jpg", async (route) => {
    await imageRequestGate;
    await route.abort();
  });

  const navigation = page.goto("/en/");
  const imageFrame = page.locator(".image-frame").first();
  await expect(imageFrame.locator(".image-frame__shimmer")).toBeVisible();
  releaseImageRequest();
  await navigation;
  await expect(imageFrame).toHaveClass(/image-frame--failed/);
  await expect(
    imageFrame.locator(".image-frame__fallback img"),
  ).toHaveAttribute("src", "/full-logo-white.png");
});

test("song video preview activates its privacy-enhanced YouTube player", async ({
  page,
}) => {
  expect(
    videoPost,
    "published Sanity data must include at least one valid song video",
  ).toBeTruthy();
  if (!videoPost) return;

  await page.goto(`/en/music/${videoPost.slug}/`);
  const playButton = page.getByRole("button", {
    name: `Play ${videoPost.title}`,
  });
  await waitForHydration(playButton);
  await playButton.click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    `https://www.youtube-nocookie.com/embed/${videoPost.videoId}?autoplay=1`,
  );
});
