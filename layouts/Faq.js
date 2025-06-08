import { markdownify } from "@lib/utils/textConverter";
import Image from 'next/image'

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, faqs } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row  -mt-6">
          Hello, world
        </div>
      </div>
    </section>
  );
}

export default Faq;
