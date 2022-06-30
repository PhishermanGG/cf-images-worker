# Cloudflare Images Worker + Cache API
Cloudflare Worker for serving Cloudflare Images over a custom domain and utilising the Cache API.

## Usage
Under Settings > Variables create the following
* `CF_IMAGES_ACCOUNT_HASH` = Your Cloudflare Images account hash
* `IMAGES_PATH` = The path on the domain you wish to serve images for. If you are serving images from `https://mydomain.com/assets/images/myimage.jpg` enter `/assets/images/`.
