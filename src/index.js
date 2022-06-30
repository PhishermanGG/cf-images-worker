addEventListener('fetch', event => {
   event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
   const request = event.request

   const url = new URL(request.url);
   const cache = caches.default;
   let response = await cache.match(request);

   if (!response) {

      const { variant, imageName } = extractVariant(url);
      if (!variant || !imageName) {
         return notFound();
      }

      // Use Cloudflare Images to deliver image ✨
      response = await fetch("https://imagedelivery.net/" + CF_IMAGES_ACCOUNT_HASH + "/" + imageName + "/" + variant, {
         // relay request headers to Cloudflare Images,
         // to inform about the media types accepted by the HTTP client
         headers: request.headers,
      });

      const headers = new Headers(response.headers);
      headers.set("cache-control", "public, max-age=31536000");
      headers.set("vary", "Accept");
      response = new Response(response.body, { ...response, headers });
      event.waitUntil(cache.put(request, response.clone()));

   }

   return response;

}

function extractVariant(url) {
   const parts = url.pathname.replace(IMAGES_PATH, "").split("/");
   const variant = parts.shift();
   return { variant: variant, imageName: parts.join("/") };
}

function notFound() {
   return new Response("Not found", { status: 404 });
}
