const cacheName="static_cache_1";
const appFiles=[
	"manifest.json",
	"error.html"
];


self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello world!");

    installing.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(appFiles))
      );
  });
  
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: All systems online, ready to go!");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: User threw a ball, I need to fetch it!");
   
    fetching.respondWith(
        caches.match(fetching.request.url).then((response)=>{
          console.log("Service Worker: Fetching resource "+fetching.request.url);
          return response||fetch(fetching.request).then((response)=>{
            console.log("Service Worker: Resource "+fetching.request.url+" not available in cache");
            return caches.open(fetching).then((cache)=>{
                console.log("Service Worker: Caching (new) resource "+fetching.request.url);
               // cache.put(fetching.request,response.clone());
              return response;
            });
          }).catch(function(){      
            console.log("Service Worker: Fetching online failed, HAALLPPPP!!!");
            console.log(fetching.request.mode)
            if(fetching.request.mode == "navigate"){
                return caches.match("error.html")
            }
            //Do something else with the request (respond with a different cached file)
          })
        })
      );
    

  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
        console.log(pushing.data)
        

      
  })
  
 