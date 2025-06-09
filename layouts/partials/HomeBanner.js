import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const HomeBanner = ({ banner }) => {
  return (
    <section className="section pb-[50px]">
      <div className="container">
      <div className="section row pb-0 mb-8">
        <div className="row text-center">
          <div className="mx-auto lg:col-10">
            <h1 className="font-primary font-bold">{banner.title}</h1>
            <p className="mt-4">{markdownify(banner.content)}</p>
            <Image
              className="mx-auto mt-12"
              src={banner.image}
              width={450}
              height={20}
              alt="banner image"
              priority
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HomeBanner;
