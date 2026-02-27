import time
from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to the app
        print("Navigating to app...")
        page.goto("http://localhost:3000")
        time.sleep(2) # Wait for app to load

        # Screenshot Initial State (Inventory)
        print("Taking Inventory screenshot...")
        page.screenshot(path="verification_inventory.png")

        # 2. Add a Device
        print("Adding a device...")
        page.click("text=Scan a new appliance")
        page.fill("input[placeholder='Appliance Name (e.g. TV)']", "Test Lamp")
        page.fill("input[placeholder='Wattage (W)']", "60")
        page.click("button:has-text('Add')")
        time.sleep(1)

        # Screenshot Inventory after adding
        print("Taking Inventory after add screenshot...")
        page.screenshot(path="verification_inventory_added.png")

        # 3. Go to Settings and change rate
        print("Navigating to Settings...")
        page.click("text=Settings")
        time.sleep(1)

        print("Changing electricity rate...")
        # Clear and type new rate
        rate_input = page.locator("input[type='number']")
        rate_input.fill("0.20")
        time.sleep(1)

        # Screenshot Settings
        print("Taking Settings screenshot...")
        page.screenshot(path="verification_settings.png")

        # 4. Go to Insights to verify calculations
        print("Navigating to Insights...")
        page.click("text=Insights")
        time.sleep(1)

        # Screenshot Insights
        print("Taking Insights screenshot...")
        page.screenshot(path="verification_insights.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_app()
