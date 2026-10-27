import { readFile } from "node:fs/promises";
import { expect, test, type Locator } from "@playwright/test";
import type { Post } from "../../lib/content";

const posts = JSON.parse(
  await readFile(".generated/posts.json", "utf8"),
) as Post[];
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

test("mobile navigation opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.getByRole("button", { name: "Menu" });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  const menuSize = await menu.evaluate((element) => {
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
  });
  expect(menuSize.width).toBeGreaterThanOrEqual(44);
  expect(menuSize.height).toBeGreaterThanOrEqual(44);
  await waitForHydration(menu);
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Bio" }).click();
  await expect(page).toHaveURL(/\/bio\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("keyboard users can skip content and dismiss mobile navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

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
  await page.goto("/");

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
    "rgba(0, 29, 36, 0.2) 0px 4px 14px 0px",
  );
  await expect(page.locator(".navigation")).toHaveCSS("display", "none");
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
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).toHaveCSS("position", "relative");
  const landscapePadding = await header.evaluate(
    (element) => Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  expect(landscapePadding).toBeGreaterThanOrEqual(24);

  await page.setViewportSize({ width: 1280, height: 800 });
  const desktopPadding = await header.evaluate(
    (element) => Number.parseFloat(getComputedStyle(element).paddingLeft),
  );
  expect(desktopPadding).toBe(60);
});

test("music cards have a subtle shadow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".card").first()).toHaveCSS(
    "box-shadow",
    "rgba(0, 29, 36, 0.22) 0px 4px 14px 0px",
  );
});

test("song video preview activates its privacy-enhanced YouTube player", async ({
  page,
}) => {
  expect(
    videoPost,
    "published Sanity data must include at least one valid song video",
  ).toBeTruthy();
  if (!videoPost) return;

  await page.goto(`/music/${videoPost.slug}/`);
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
