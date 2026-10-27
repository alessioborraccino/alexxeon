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
  await waitForHydration(menu);
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Bio" }).click();
  await expect(page).toHaveURL(/\/bio\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
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
    "rgb(7, 84, 39)",
  );
  const header = page.locator(".site-header");
  await expect(header).toHaveCSS("position", "sticky");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect
    .poll(() =>
      header.evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBe(0);
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
