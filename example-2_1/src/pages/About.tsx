/**
 * @description
 * This function will only get called on the server.
 * What we return to this function will get passed in as props
 * to the component below.
 */
export const getServerSideProps = async () => {
  return {
    props: {
      message: "[getServerSideProps]: Hello from the About.tsx route."
    }
  };
};

export default function About() {
  return <h1>About</h1>;
}
