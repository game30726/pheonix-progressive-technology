import Link from "next/link";
import Cta from "./components/Cta";

function products({ data }) {
  const {
    frontmatter: { title },
  } = data;
  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            TEST
          </div>
        </div>
      </section>
    </>
  );
}

export default products;
