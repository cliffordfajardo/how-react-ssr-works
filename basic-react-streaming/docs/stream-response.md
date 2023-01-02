Command:
```
curl http://localhost:3000
```

Results in the code block below.
Noticed the `<template>` and tiny script that react injects `$RC`

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preload" as="style" href="/index.css" />
    <link rel="stylesheet" href="/index.css" />
  </head>
  <body>
    <div id="app">
      <header>Header</header>
      <h2>Product Description</h2>
      <p>Product information ready for SEO</p>
      <h2>Comments</h2>
      <!--$?--><template id="B:0"></template>
      <div>Loading...</div>
      <!--/$-->
      <footer>Footer</footer>
    </div>
    <script>
      window.__data = { description: "Product information ready for SEO" };
    </script>
    <script src="/main.js"></script>
    <!--$?--><template id="B:1"></template>
    <script></script>
    <!--/$-->
    <div hidden id="S:0">
      <div>
        <ul>
          <li>Comment 1</li>
          <li>Comment 2</li>
          <li>Comment 3</li>
        </ul>
        <input type="text" value="" /><button>Add Comment</button>
      </div>
    </div>
    <script>
      $RC = function (b, c, e) {
        c = document.getElementById(c);
        c.parentNode.removeChild(c);
        var a = document.getElementById(b);
        if (a) {
          b = a.previousSibling;
          if (e) (b.data = "$!"), a.setAttribute("data-dgst", e);
          else {
            e = b.parentNode;
            a = b.nextSibling;
            var f = 0;
            do {
              if (a && 8 === a.nodeType) {
                var d = a.data;
                if ("/$" === d)
                  if (0 === f) break;
                  else f--;
                else ("$" !== d && "$?" !== d && "$!" !== d) || f++;
              }
              d = a.nextSibling;
              e.removeChild(a);
              a = d;
            } while (a);
            for (; c.firstChild; ) e.insertBefore(c.firstChild, a);
            b.data = "$";
          }
          b._reactRetry && b._reactRetry();
        }
      };
      $RC("B:0", "S:0");
    </script>
    <div hidden id="S:1">
      <script>
        window.setComments(["Comment 1", "Comment 2", "Comment 3"]);
      </script>
    </div>
    <script>
      $RC("B:1", "S:1");
    </script>
  </body>
</html>
```



No buffer via this command:

```
```

Results in 2 chunks coming in for our current code.
Chunk1

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preload" as="style" href="/index.css" />
    <link rel="stylesheet" href="/index.css" />
  </head>
  <body>
    <div id="app">
      <header>Header</header>
      <h2>Product Description</h2>
      <p>Product information ready for SEO</p>
      <h2>Comments</h2>
      <!--$?--><template id="B:0"></template>
      <div>Loading...</div>
      <!--/$-->
      <footer>Footer</footer>
    </div>
    <script>
      window.__data = { description: "Product information ready for SEO" };
    </script>
    <script src="/main.js"></script>
    <!--$?--><template id="B:1"></template>
    <script></script>
    <!--/$-->
```

Chunk2: which completes the HTML document and includes closing `</html>` tag

```html
<div hidden id="S:0">
      <div>
        <ul>
          <li>Comment 1</li>
          <li>Comment 2</li>
          <li>Comment 3</li>
        </ul>
        <input type="text" value="" /><button>Add Comment</button>
      </div>
    </div>
    <script>
      $RC = function (b, c, e) {
        c = document.getElementById(c);
        c.parentNode.removeChild(c);
        var a = document.getElementById(b);
        if (a) {
          b = a.previousSibling;
          if (e) (b.data = "$!"), a.setAttribute("data-dgst", e);
          else {
            e = b.parentNode;
            a = b.nextSibling;
            var f = 0;
            do {
              if (a && 8 === a.nodeType) {
                var d = a.data;
                if ("/$" === d)
                  if (0 === f) break;
                  else f--;
                else ("$" !== d && "$?" !== d && "$!" !== d) || f++;
              }
              d = a.nextSibling;
              e.removeChild(a);
              a = d;
            } while (a);
            for (; c.firstChild; ) e.insertBefore(c.firstChild, a);
            b.data = "$";
          }
          b._reactRetry && b._reactRetry();
        }
      };
      $RC("B:0", "S:0");
    </script>
    <div hidden id="S:1">
      <script>
        window.setComments(["Comment 1", "Comment 2", "Comment 3"]);
      </script>
    </div>
    <script>
      $RC("B:1", "S:1");
    </script>
  </body>
</html>

```
