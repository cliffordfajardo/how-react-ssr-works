# Basic DIY React Streaming
This is code from Jack Harrington's react-streaming repo.
He also has a youtube video explaining the repo: https://www.youtube.com/watch?v=o3JWb04DRIs&t=1310s

This code is similar to the react streaming demo repo's that the react team shared publically.


## Summary
- This code shows how basic HTTP streaming works in react.
- React comes built in with HTTP streamin utilities. You can observe this by looking at the `docs/stream-response.md` file. For streaming to work, you do need a javascript enabled browser since React needs to execute the `$RC` function to replace the placeholder sections with the real data eventually.



## Inspecting React Streaming Data
Checkout the `docs/streaming-response.md` file to get a glimpse of what react does when we stream the document.
Video explanation: https://youtu.be/o3JWb04DRIs?t=2275


```sh
# resolve until all data is complete (we wont see http streaming in stdout)
curl http://localhost:3000

# stream the data like the browser
curl --no-buffer http://localhost:3000
```
