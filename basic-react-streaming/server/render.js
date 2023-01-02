import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";

import Html from "../src/Html";
import App from "../src/App";

/**
 * Simulate fake async call.
 */
const fetchDescription = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Product information ready for SEO"), 250)
  );

/**
 * Simulate fake async call.
 */
const commentsFetch = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(["Comment 1", "Comment 2", "Comment 3"]), 2000)
  );

async function render(res) {
  const description = await fetchDescription();
  const comments = commentsFetch();

  const stream = renderToPipeableStream(
    <Html description={description} comments={comments}>
      <App description={description} comments={comments} />
    </Html>,
    {
      onShellReady() {
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
    }
  );
}

export default render;
