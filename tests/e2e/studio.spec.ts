import { expect, test } from "@playwright/test";

const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=", "base64");
const image = (name: string) => ({ name, mimeType: "image/png", buffer: png });

test("queue, reorder, selection, deletion and reload stay consistent", async ({ page }, testInfo) => {
  const errors: string[] = [];
  const requests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (["fetch", "xhr"].includes(request.resourceType())) requests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator(".queue-count")).toHaveText("0 / 0 terminées");
  const input = page.locator("input[type=file]");
  const longName = `${"nom-tres-long-".repeat(8)}.png`;
  await input.setInputFiles([image("premiere.png"), image("deuxieme.png"), image(longName)]);
  await expect(page.locator(".queue-item")).toHaveCount(3);
  await expect(page.locator(".queue-count")).toHaveText("0 / 3 terminées");
  await expect(page.locator(".queue-status-queued")).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Avancer l’image 1", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Reculer l’image 3", exact: true })).toBeDisabled();
  await page.locator(".queue-item").nth(1).click();
  const selectedUrl = await page.locator(".preview-stage img").getAttribute("src");
  await page.getByRole("button", { name: "Avancer l’image 2", exact: true }).click();
  await expect(page.locator(".queue-filename")).toHaveText(["deuxieme.png", "premiere.png", longName]);
  await expect(page.locator(".queue-item").first()).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".preview-stage img")).toHaveAttribute("src", selectedUrl!);
  await expect(page.locator(".preview-index")).toHaveText("IMAGE / 001");
  await page.getByRole("button", { name: "Reculer l’image 1", exact: true }).click();
  await expect(page.locator(".preview-index")).toHaveText("IMAGE / 002");
  await page.locator(".queue-item").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".preview-index")).toHaveText("IMAGE / 001");
  await expect(page.locator(".generate-button")).toBeDisabled();
  await expect(page.locator(".generate-button")).toContainText("GENERATION AVAILABLE IN V0.2");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator(".preview-stage img")).toBeVisible();
  expect(await page.locator(".preview-stage img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("studio.png"), fullPage: true });
  for (const count of [2, 1, 0]) {
    await page.getByRole("button", { name: "Supprimer l'image 1", exact: true }).click();
    await expect(page.locator(".queue-item")).toHaveCount(count);
    await expect(page.locator(".queue-count")).toHaveText(`0 / ${count} terminées`);
  }
  await expect(page.locator(".preview-stage img")).toHaveCount(0);
  await input.setInputFiles(image("reimport.png"));
  await expect(page.locator(".queue-item")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".queue-count")).toHaveText("0 / 0 terminées");
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
});

test("mixed imports report every rejected file and keep valid images", async ({ page }) => {
  await page.goto("/");
  await page.locator("input[type=file]").setInputFiles([
    image("valid.png"),
    { name: "document.txt", mimeType: "text/plain", buffer: Buffer.from("text") },
    { name: "empty.png", mimeType: "image/png", buffer: Buffer.alloc(0) },
    { name: "large.png", mimeType: "image/png", buffer: Buffer.alloc(12 * 1024 * 1024 + 1) },
    { name: "vector.svg", mimeType: "image/svg+xml", buffer: Buffer.from("<svg />") },
  ]);
  await expect(page.locator(".queue-item")).toHaveCount(1);
  for (const text of ["document.txt", "empty.png", "large.png", "vector.svg"]) {
    await expect(page.locator(".media-panel").getByRole("alert")).toContainText(text);
  }
  const transfer = await page.evaluateHandle(() => {
    const data = new DataTransfer();
    data.items.add(new File(["unsupported"], "drop.gif", { type: "image/gif" }));
    return data;
  });
  await page.locator(".media-dropzone").dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.locator(".media-panel").getByRole("alert")).toContainText("drop.gif");
  await expect(page.locator(".queue-item")).toHaveCount(1);
  await transfer.dispose();
  await page.locator("input[type=file]").setInputFiles(image("second.png"));
  await expect(page.locator(".media-panel").getByRole("alert")).toHaveCount(0);
  await expect(page.locator(".queue-item")).toHaveCount(2);
});

test("effects and settings remain usable after media changes", async ({ page }, testInfo) => {
  await page.goto("/");
  const effects = page.locator("details#effects");
  await expect(effects).not.toHaveAttribute("open", "");
  if (testInfo.project.name === "desktop") {
    await page.getByRole("link", { name: "Effects", exact: true }).click();
  } else {
    await effects.locator("summary").click();
  }
  await expect(effects).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Aucun effet Original" }).click();
  await expect(page.locator(".effect-description")).toContainText("Aucune transformation");
  await page.getByLabel("Movement intensity").selectOption("strong");
  await page.locator("input[type=file]").setInputFiles(image("source.png"));
  await expect(page.getByLabel("Movement intensity")).toHaveValue("strong");
  await expect(effects).toHaveAttribute("open", "");
  await expect(page.locator(".effect-description")).toContainText("Aucune transformation");
});
