
Aye

# [Bookmarklet-Editor-Download-All-Images-Sample](https://ctrld.herokuapp.com/?url=https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15&file=download-linked-images.js)

* Click on Bookmaklet to load Bookmarklet-Editor. 
* Wait until "toolbox" in upper left corner appears.
* Click On "Toolbox"
* Edit The Bookmarklet Code
* When done click "create bookmarklet" 
* Drag appeaering ink to your bookmarks toolbar.
* Eventually Edit Label
* Have fun!

Make sure your download folder is set properly in the browser settings. 
It's recommended to set the browser to download files automtically in order to prevent dialogue pop-ups!


### Note: You can use `await loadScript(url)` to inject async script sources into page body.

This way you can minimize the final code load. Move satelites in space, make the girls get naked and shit. 

Greetz

[earendel](https://gist.github.com/hagb4rd) 

@ == team [f-u-c-k-u-p](https://github.com/f-u-c-k-u-p) =====--
`

P.S.

Geg this one here too. This bookmarklet loads that "toolbox" with the Bookmarklet-Editor itself. 

### [Bookmarklet-Editor-Bookmaklet-Quine-Toolbox](https://ctrld.herokuapp.com/?url=https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15&file=toolbox.js)

---

## Appendix

Planning to put more bookmarklets in that gist here:

(https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15)[https://gist.github.com/hagb4rd/6843803a6674fe1b9ead6f1e60f14f15]


##### Download-All-Images Code

```js
(async function() {

  var xorString=(s)=>[...String(s)].reduce((prev, next) => prev ^= next.charCodeAt(0), 0xFF);

  var loadScript = (url) => new Promise((resolve,reject) => {
    var id='mk'+xorString(url);
    var elem=document.querySelector('#'+id);
    if(elem) {
        resolve(elem);
    } else {
          elem = document.createElement('script');
          elem.setAttribute('async','');
          elem.src=url;
          elem.id=id;
          elem.addEventListener('load',(e)=>resolve(e));
          elem.addEventListener('error',(e)=>reject(e));
    }
    (document.head || document.getElementsByTagName('head')[0] || document.documentElement).appendChild(elem);             
  });

  var linkedImages=(d)=>{
    d=d||window.document;
    var xs=d.querySelectorAll("[href$=\".jpg\"],[href$=\".png\"]")
    var is=[...xs].map(x=>x.href);
    return is;
  }
  var embedImages=(minW=250,minH=250)=>[...$.qsa('img')].filter(({width, height})=>(width>=minW && height>=minH));

  var readAsDataUrl=(src)=>new Promise((resolve,reject) => {
    if(tyopeof(src)='string') {
      fetch(src)
        .then(resp=>resp.blob())
        .then(blob=>{
        var reader = new FileReader(); 
        reader.addEventListener('load', (e)=>resolve(reader.result));
        reader.readAsDataURL(blob);
      })
      .catch(e=>(console.log(`readAsDataUrl: ${src} Error: ${e.message}`),resolve('')));
    } else {
      var t=t||"image/jpeg";
      var e=src;
      var n=document.createElement("CANVAS");
      n.height=e.height||16,n.width=e.width||16,n.getContext("2d").drawImage(e,0,0);
      var i=n.toDataURL(t); resolve(i||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==");
    }
  })

  var download=(dataUrl,name)=>{
    var a=document.createElement('a');
    a.href=dataUrl;
    a.setAttribute('download', name);
    a.style.display='none';
    (document.body || document.documentElement).appendChild(a);
    a.click();
  }
  var downloadLinkedImages=async() => {
    [...linkedImages()].map((async(url)=>{
        try {
          var name=`${location.host}${location.pathname.replace(/\//g,'.')}.${url.split(/\//).pop()}`;
          var dataUrl=await readAsDataUrl(url);
          download(dataUrl,name);
          console.log([name,url,dataUrl]);   
        } catch(e) {
          console.log(e);
        }           
    }))
  };
  var downloadImages=(w=250,h=250)=>embedImages(w,h).forEach(i=>{
    var url=new URL(i.src); 
    var name=[url.host].concat(i.alt?i.alt.match(/\w+/g):[]).concat(url.pathname.match(/[^/\?]+/g)).filter(x=>!!x).join('-');
    var dataUrl=readAsDataUrl(i);
    download(dataUrl,name); 
  });
  
  // do it
  // -----
  downloadImages(250,250); //minWidth, minHeight filter
  downloadLinkedImages();

})()
```

---

Note: Should you copy paste it into your location bar, you'll probably have to re-add that "javascript:" prefix as it seems to disappear for some rason. 


###### Download-All-Images-Bookmarklet

`javascript:(function(){var s=document.createElement("script");s.src="data:application/javascript;data:application/javascript;base64,KGZ1bmN0aW9uKCkgeyAKICBmdW5jdGlvbiB4b3JTdHJpbmcocyl7IHJldHVybiBbLi4uU3RyaW5nKHMpXS5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgXj0gbmV4dC5jaGFyQ29kZUF0KDApLCAweEZGKSB9OwogIGZ1bmN0aW9uIGxvYWRTY3JpcHQodXJsKXsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57CiAgICAgICAgdmFyIGlkPSdtaycreG9yU3RyaW5nKHVybCk7CiAgICAgICAgdmFyIGVsZW09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycraWQpOwogICAgICAgIGlmKGVsZW0pIHsKICAgICAgICAgICAgcmVzb2x2ZShlbGVtKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsKICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnYXN5bmMnLCcnKTsKICAgICAgICAgICAgICBlbGVtLnNyYz11cmw7CiAgICAgICAgICAgICAgZWxlbS5pZD1pZDsKICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLChlKT0+cmVzb2x2ZShlKSk7CiAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsKGUpPT5yZWplY3QoZSkpOwogICAgICAgIH0KICAgICAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoZWxlbSk7ICAgICAgICAgICAgIAogICAgfSkKICB9OwogIHZhciB4b3JTdHJpbmc9KHMpPT5bLi4uU3RyaW5nKHMpXS5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgXj0gbmV4dC5jaGFyQ29kZUF0KDApLCAweEZGKTsNCg0KdmFyIGxvYWRTY3JpcHQgPSAodXJsKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHsNCiAgdmFyIGlkPSdtaycreG9yU3RyaW5nKHVybCk7DQogIHZhciBlbGVtPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2lkKTsNCiAgaWYoZWxlbSkgew0KICAgICAgcmVzb2x2ZShlbGVtKTsNCiAgfSBlbHNlIHsNCiAgICAgICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOw0KICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnYXN5bmMnLCcnKTsNCiAgICAgICAgZWxlbS5zcmM9dXJsOw0KICAgICAgICBlbGVtLmlkPWlkOw0KICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLChlKT0+cmVzb2x2ZShlKSk7DQogICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLChlKT0+cmVqZWN0KGUpKTsNCiAgfQ0KICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoZWxlbSk7ICAgICAgICAgICAgIA0KfSk7DQoNCnZhciBsaW5rZWRJbWFnZXM9KGQpPT57DQogIGQ9ZHx8d2luZG93LmRvY3VtZW50Ow0KICB2YXIgeHM9ZC5xdWVyeVNlbGVjdG9yQWxsKCJbaHJlZiQ9XCIuanBnXCJdLFtocmVmJD1cIi5wbmdcIl0iKQ0KICB2YXIgaXM9Wy4uLnhzXS5tYXAoeD0+eC5ocmVmKTsNCiAgcmV0dXJuIGlzOw0KfQ0KdmFyIGVtYmVkSW1hZ2VzPShtaW5XPTI1MCxtaW5IPTI1MCk9PlsuLi4kLnFzYSgnaW1nJyldLmZpbHRlcigoe3dpZHRoLCBoZWlnaHR9KT0+KHdpZHRoPj1taW5XICYmIGhlaWdodD49bWluSCkpOw0KDQp2YXIgcmVhZEFzRGF0YVVybD0oc3JjKT0+bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7DQogIGlmKHR5b3Blb2Yoc3JjKT0nc3RyaW5nJykgew0KICAgIGZldGNoKHNyYykNCiAgICAgIC50aGVuKHJlc3A9PnJlc3AuYmxvYigpKQ0KICAgICAgLnRoZW4oYmxvYj0+ew0KICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7IA0KICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZSk9PnJlc29sdmUocmVhZGVyLnJlc3VsdCkpOw0KICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7DQogICAgfSkNCiAgICAuY2F0Y2goZT0+KGNvbnNvbGUubG9nKGByZWFkQXNEYXRhVXJsOiAke3NyY30gRXJyb3I6ICR7ZS5tZXNzYWdlfWApLHJlc29sdmUoJycpKSk7DQogIH0gZWxzZSB7DQogICAgdmFyIHQ9dHx8ImltYWdlL2pwZWciOw0KICAgIHZhciBlPXNyYzsNCiAgICB2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJDQU5WQVMiKTsNCiAgICBuLmhlaWdodD1lLmhlaWdodHx8MTYsbi53aWR0aD1lLndpZHRofHwxNixuLmdldENvbnRleHQoIjJkIikuZHJhd0ltYWdlKGUsMCwwKTsNCiAgICB2YXIgaT1uLnRvRGF0YVVSTCh0KTsgcmVzb2x2ZShpfHwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95d0FBQUFBQVFBQkFBQUNBVXdBT3c9PSIpOw0KICB9DQp9KQ0KDQp2YXIgZG93bmxvYWQ9KGRhdGFVcmwsbmFtZSk9PnsNCiAgdmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpOw0KICBhLmhyZWY9ZGF0YVVybDsNCiAgYS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgbmFtZSk7DQogIGEuc3R5bGUuZGlzcGxheT0nbm9uZSc7DQogIChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoYSk7DQogIGEuY2xpY2soKTsNCn0NCnZhciBkb3dubG9hZExpbmtlZEltYWdlcz1hc3luYygpID0+IHsNCiAgWy4uLmxpbmtlZEltYWdlcygpXS5tYXAoKGFzeW5jKHVybCk9PnsNCiAgICAgIHRyeSB7DQogICAgICAgIHZhciBuYW1lPWAke2xvY2F0aW9uLmhvc3R9JHtsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cLy9nLCcuJyl9LiR7dXJsLnNwbGl0KC9cLy8pLnBvcCgpfWA7DQogICAgICAgIHZhciBkYXRhVXJsPWF3YWl0IHJlYWRBc0RhdGFVcmwodXJsKTsNCiAgICAgICAgZG93bmxvYWQoZGF0YVVybCxuYW1lKTsNCiAgICAgICAgY29uc29sZS5sb2coW25hbWUsdXJsLGRhdGFVcmxdKTsgICANCiAgICAgIH0gY2F0Y2goZSkgew0KICAgICAgICBjb25zb2xlLmxvZyhlKTsNCiAgICAgIH0gICAgICAgICAgIA0KICB9KSkNCn07DQp2YXIgZG93bmxvYWRJbWFnZXM9KHc9MjUwLGg9MjUwKT0+ZW1iZWRJbWFnZXModyxoKS5mb3JFYWNoKGk9PnsNCiAgdmFyIHVybD1uZXcgVVJMKGkuc3JjKTsgDQogIHZhciBuYW1lPVt1cmwuaG9zdF0uY29uY2F0KGkuYWx0P2kuYWx0Lm1hdGNoKC9cdysvZyk6W10pLmNvbmNhdCh1cmwucGF0aG5hbWUubWF0Y2goL1teL1w/XSsvZykpLmZpbHRlcih4PT4hIXgpLmpvaW4oJy0nKTsNCiAgdmFyIGRhdGFVcmw9cmVhZEFzRGF0YVVybChpKTsNCiAgZG93bmxvYWQoZGF0YVVybCxuYW1lKTsgDQp9KTsNCg0KZG93bmxvYWRJbWFnZXMoMjUwLDI1MCk7IC8vbWluV2lkdGgsIG1pbkhlaWdodCBmaWx0ZXINCmRvd25sb2FkTGlua2VkSW1hZ2VzKCk7CQkKfSkoKQ==";document.body.append(s)})()` 


##### Bookmarklet-Editor-Bookmarklet

`javascript:(function(){var s=document.createElement("script");s.src="data:application/javascript;data:application/javascript;base64,KGZ1bmN0aW9uKCkgeyAKICBmdW5jdGlvbiB4b3JTdHJpbmcocyl7IHJldHVybiBbLi4uU3RyaW5nKHMpXS5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgXj0gbmV4dC5jaGFyQ29kZUF0KDApLCAweEZGKSB9OwogIGZ1bmN0aW9uIGxvYWRTY3JpcHQodXJsKXsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57CiAgICAgICAgdmFyIGlkPSdtaycreG9yU3RyaW5nKHVybCk7CiAgICAgICAgdmFyIGVsZW09ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycraWQpOwogICAgICAgIGlmKGVsZW0pIHsKICAgICAgICAgICAgcmVzb2x2ZShlbGVtKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsKICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnYXN5bmMnLCcnKTsKICAgICAgICAgICAgICBlbGVtLnNyYz11cmw7CiAgICAgICAgICAgICAgZWxlbS5pZD1pZDsKICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLChlKT0+cmVzb2x2ZShlKSk7CiAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsKGUpPT5yZWplY3QoZSkpOwogICAgICAgIH0KICAgICAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoZWxlbSk7ICAgICAgICAgICAgIAogICAgfSkKICB9OwogIHZhciBtYWluPWFzeW5jKCk9PnsKCXRyeSB7CgkJdmFyIGNkbiA9IHsKCQkJJyQnOiAnaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS9oYWdiNHJkL2VhLXdlYmtpdC9tYXN0ZXIvZGlzdC93ZWJraXQubWluLmpzJywKCQkJJ3JlcXVpcmVqcyc6J2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3JlcXVpcmUuanMvMi4zLjUvcmVxdWlyZS5taW4uanMnLAoJCQknYWNlJzonaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYWNlLzEuMy4zL2FjZS5qcycKCQl9OwoJCWF3YWl0IGxvYWRTY3JpcHQoY2RuWyckJ10pOwoJCWF3YWl0IGxvYWRTY3JpcHQoY2RuWydoeXBlcmh0bWwnXSk7CgkJY29uc29sZS5sb2coT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoJCkuc29ydCgkLmNtcC5sb2NhbGUpKTsKCX0gY2F0Y2ggKGUpIHsKCQljb25zb2xlLmxvZyhlKQogIH0KICAvL2NyZWF0ZXMgdGhpcyBib29rbWFya2xldCBlZGl0b3IgOm8gCgkkLnRvb2xib3goKTsKfTsKbWFpbigpLmNhdGNoKGNvbnNvbGUubG9nKTsJCQp9KSgp";document.body.append(s)})()`


cu