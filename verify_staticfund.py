import time
from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:3000")
        time.sleep(2)

        # 1. Dashboard
        print("Taking Dashboard screenshot...")
        page.screenshot(path="verification_dashboard.png")

        # 2. Go to Inventory
        print("Navigating to Inventory...")
        page.click("text=Inventory")
        time.sleep(1)

        # 3. Simulate Scan (adds to memory)
        print("Simulating Vision Scan...")
        page.click("text=Scan a new appliance")
        time.sleep(1)

        # Take screenshot of form filled out by scan
        print("Taking Inventory Scan form screenshot...")
        page.screenshot(path="verification_inventory_scan.png")

        # Submit the form
        page.click("button:has-text('Add')")
        time.sleep(1)

        # 4. Search Memory
        print("Testing Memory Search...")
        search_input = page.locator("input[placeholder*='Search Memory']")
        search_input.fill("toaster")
        time.sleep(1) # wait for mock API delay

        print("Taking Inventory Search screenshot...")
        page.screenshot(path="verification_inventory_search.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_app()
