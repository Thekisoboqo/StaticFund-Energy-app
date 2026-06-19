from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173")
    page.wait_for_timeout(500)

    # Click on Settings in the bottom nav bar
    page.get_by_role("button", name="Settings").click()
    page.wait_for_timeout(500)

    # Update settings using get_by_role with name if label fails
    page.get_by_role("spinbutton").first.fill("40")
    page.wait_for_timeout(500)

    page.get_by_role("spinbutton").nth(1).fill("0.20")
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Save Settings").click()
    page.wait_for_timeout(500)

    # Navigate back to Insights
    page.get_by_role("button", name="Insights").click()
    page.wait_for_timeout(1000)

    page.screenshot(path="/app/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/app/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
