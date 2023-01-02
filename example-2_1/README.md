# Vite SSR React

NOTE: this work is not complete
This folder contains code similar to example 1.1. I planned on creating a mini-nextjs with that starting code.


## Features
This an example app recrreating a super basic SSR react app with basic hydration.
The style of the directories is similar to a Next v12 app.
I implement a super basic version of getServerSideProps
- `getServerSideProps`:
  - if a file in our our `/pages` folder exports a `getServerSideProps` function, our bundler will server render (SSR) this page on each request using the data returned by `getServerSideProps`
- `getStaticProps`: 
  - if a file in our our `/pages` folder exports a `getStaticProps` function, our bundler will pre-render a page on each request using the data returned by `getStaticProps`
  - https://youtu.be/Sklc_fQBmcs?t=504



## References
- https://vitejs.dev/guide/ssr.html#server-side-rendering
