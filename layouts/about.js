import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { markdownify } from "@lib/utils/textConverter";

export default async function AboutPage() {
  const aboutFilePath = path.join(process.cwd(), "content/about.md");
  const fileContent = await fs.readFile(aboutFilePath, "utf8");
  const { data } = matter(fileContent);

  const about = data.about;

  return (
    <section className="section">
      <div className="container">
        <div className="section row pb-0 mb-8">
          {about?.image && (
            <div className="col-12 md:col-6 lg:col-5 mb-6 md:mb-0">
              <Image
                src={about.image}
                alt="About"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="content col-12 md:col-6 lg:col-7">
            {markdownify(about.title, "h4")}

            <ul className="list-none pl-5">
  {about.description.map((item, idx) => (
    <li
      key={idx}
      className="relative pl-5 before:absolute before:left-0 before:top-[10px] before:h-2 before:w-2 before:rounded-full before:bg-primary before:content-['']"
    >
      {item}
    </li>
  ))}
</ul>

          </div>
        </div>
      </div>
    </section>
  );
}
