import * as React from "react";
import { Suspense, use } from "react";

function CommentsScript({ comments: commentsPromise }) {
  const comments = use(commentsPromise); // resolve the promise data

  return (
    <script
      dangerouslySetInnerHTML={{
        /**
         * `setComments` will be available on the global scope by the time this gets called.
         * See src/index.js which is the root of the app.
         */
        __html: `window.setComments(${JSON.stringify(comments)})`,
      }}
    />
  );
}

export default ({ children, comments, description }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__data = ${JSON.stringify({
            description,
          })};`,
        }}
      ></script>
      <script src="/main.js"></script>
      <Suspense fallback={<script></script>}>
        <CommentsScript comments={comments} />
      </Suspense>
    </html>
  );
};
