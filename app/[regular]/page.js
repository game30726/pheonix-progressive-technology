import NotFound from "@layouts/404";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Customer from "@layouts/customer";
import Pricing from "@layouts/Pricing";
import SeoMeta from "@layouts/SeoMeta";
import About from "@layouts/about";
import Services from "@layouts/services";
import Ourbrands from "@layouts/ourbrands";

import { getRegularPage, getSinglePage } from "@lib/contentParser";

export default async function RegularPages({ params }) {
  params = await params;
  const { regular } = params;

  let regularPageData;
  try {
    regularPageData = await getRegularPage(regular);
  } catch {
    return <NotFound data={{ frontmatter: { title: "Not Found" }, content: "" }} />;
  }

  const { frontmatter, content } = regularPageData;
  const { title, meta_title, description, image, noindex, canonical, layout } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        description={description || content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />
      {layout === "404" ? (
        <NotFound data={regularPageData} />
      ) : layout === "contact" ? (
        <Contact data={regularPageData} />
      ) : layout === "pricing" ? (
        <Pricing data={regularPageData} />
      ) : layout === "customer" ? (
        <Customer data={regularPageData} />
      ) : layout === "about" ? (
        <About data={regularPageData} />
      ) : layout === "services" ? (
        <Services data={regularPageData} />
      ) : layout === "ourbrands" ? (
        <Ourbrands data={regularPageData} />
      ) : (
        <Default data={regularPageData} />
      )}
    </>
  );
}

export async function generateStaticParams() {
  const allSlugs = await getSinglePage("content");
  return allSlugs.map(item => ({ regular: item.slug }));
}
