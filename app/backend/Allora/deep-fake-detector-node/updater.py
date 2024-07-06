import os
import requests
from concurrent.futures import ThreadPoolExecutor


# Function to download the URL, called asynchronously by several child processes
def download_url(url, download_path):
    target_file_path = os.path.join(download_path, os.path.basename(url)) 
    if os.path.exists(target_file_path):
        print(f"File already exists: {url}")
        return
    
    response = requests.get(url)
    if response.status_code == 404:
        print(f"File not exist: {url}")
    else:

        # create the entire path if it doesn't exist
        os.makedirs(os.path.dirname(target_file_path), exist_ok=True)

        with open(target_file_path, "wb") as f:
            f.write(response.content)
        print(f"Downloaded: {url} to {target_file_path}")
