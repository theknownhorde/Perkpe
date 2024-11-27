from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize Chrome options
options = Options()
options.add_argument("--start-maximized")  # Start with a maximized window

# Initialize the Chrome WebDriver with the correct Service object
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

def enter_credentials(email, password):
    """Helper function to enter email and password"""
    try:
        print("Waiting for email and password fields to be visible...")
        # Wait for email and password fields to be visible and interactable
        email_field = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "email"))
        )
        email_field.clear()
        email_field.send_keys(email)
        print(f"Entered email: {email}")

        password_field = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "password"))
        )
        password_field.clear()
        password_field.send_keys(password)
        print(f"Entered password: {password}")

    except Exception as e:
        print(f"Error entering credentials: {e}")

def perform_test_1():
    """Test case for valid credentials"""
    try:
        print("\nRunning Test 1: Valid credentials login")
        driver.get("http://localhost:3000/login")

        # Wait for the page to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

        enter_credentials("test@example.com", "password123")

        # Click the login button
        driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()

        # Wait for dashboard redirection
        WebDriverWait(driver, 10).until(EC.url_contains("dashboard"))
        
        if "dashboard" in driver.current_url:
            print("Test Passed: Valid login successful.")
        else:
            print("Test Failed: Did not redirect to the dashboard.")

    except Exception as e:
        print(f"Test Failed: {e}")

def perform_test_2():
    """Test case for invalid email format"""
    try:
        print("\nRunning Test 2: Invalid email format")
        driver.get("http://localhost:3000/login")

        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

        enter_credentials("invalidemail.com", "password123")

        driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()

        # Wait for the error message
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "alert-danger")))

        error_message = driver.find_element(By.CLASS_NAME, "alert-danger").text
        print(f"Error Message for Invalid Email: {error_message}")
    
    except Exception as e:
        print(f"Test Failed: {e}")

# def perform_test_3():
#     """Test case for empty email field"""
#     try:
#         print("\nRunning Test 3: Empty email field")
#         driver.get("http://localhost:3000/login")

#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

#         enter_credentials("", "password123")

#         driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()

#         # Wait for the error message
#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "alert-danger")))

#         error_message = driver.find_element(By.CLASS_NAME, "alert-danger").text
#         print(f"Error Message for Empty Email: {error_message}")
    
#     except Exception as e:
#         print(f"Test Failed: {e}")

# def perform_test_4():
#     """Test case for empty password field"""
#     try:
#         print("\nRunning Test 4: Empty password field")
#         driver.get("http://localhost:3000/login")

#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

#         enter_credentials("test@example.com", "")

#         driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()

#         # Wait for the error message
#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "alert-danger")))

#         error_message = driver.find_element(By.CLASS_NAME, "alert-danger").text
#         print(f"Error Message for Empty Password: {error_message}")
    
#     except Exception as e:
#         print(f"Test Failed: {e}")

# def perform_test_5():
#     """Test case for incorrect login credentials"""
#     try:
#         print("\nRunning Test 5: Incorrect credentials")
#         driver.get("http://localhost:3000/login")

#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))

#         enter_credentials("wrong@example.com", "wrongpassword")

#         driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()

#         # Wait for the error message
#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "alert-danger")))

#         error_message = driver.find_element(By.CLASS_NAME, "alert-danger").text
#         print(f"Error Message for Incorrect Credentials: {error_message}")
    
#     except Exception as e:
#         print(f"Test Failed: {e}")

def perform_test_6():
    """Final Test Case - Display Testing Complete message"""
    try:
        print("\nRunning Test 6: All Test Case Complete")
        print("Testing is Done!")
    
    except Exception as e:
        print(f"Test Failed: {e}")


# Run the tests sequentially with a 5-second wait between each
try:
    perform_test_1()
    time.sleep(5)  # Wait 5 seconds before running the next test

    perform_test_2()
    time.sleep(5)

    # perform_test_3()
    # time.sleep(5)

    # perform_test_4()
    # time.sleep(5)

    # perform_test_5()
    # time.sleep(5)

    perform_test_6()

except Exception as e:
    print(f"Test Suite Failed: {e}")

finally:
    # Close the browser window after all tests
    driver.quit()
