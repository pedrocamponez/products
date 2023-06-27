from selenium import webdriver
from selenium.webdriver.common.by import By

def test_eight_components():
    driver = webdriver.Chrome()

    driver.get("http://127.0.0.1:5173")

    title = driver.title
    assert title == "Products Page"

    driver.implicitly_wait(0.5)

    product_page_button = driver.find_element(by=By.CSS_SELECTOR, value="main-link")
    product_page_button.click()

    product_name = driver.find_element(by=By.CSS_SELECTOR, value="product-name")
    product_price = driver.find_element(by=By.CSS_SELECTOR, value="product-price")
    submit_button = driver.find_element(by=By.CSS_SELECTOR, value="submit-product")

    product_name.send_keys("Mouse")
    product_price.send_keys("100")
    submit_button.click()

    search_product_name = driver.find_element(by=By.CLASS_NAME, value="search-text")
    search_product_button = driver.find_element(by=By.CLASS_NAME, value="search-button")

    search_product_name.send_keys("Mouse")
    search_product_button.click()

    delete_product_button = driver.find_element(by=By.CLASS_NAME, value="delete-button")

    delete_product_button.click()

    driver.quit()