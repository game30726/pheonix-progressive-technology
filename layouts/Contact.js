import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { info } = frontmatter;
  const { contact_form_action } = config.params;
  
  return (
    <section className="section">
      <div className="container">
        <div className="section row pb-0 mb-8">
          {/* รูปภาพด้านซ้าย */}
          {info && info.image && (
            <div className="col-12 md:col-6 lg:col-5 mb-6 md:mb-0">
              <Image
                src={info.image}
                alt="Contact us"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          {/* ข้อความด้านขวา */}
          <div className="content col-12 md:col-6 lg:col-7">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* ส่วนล่าง: ฟอร์มกรอก */}
        <div className="section row pb-0">
          <div className="col-12">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  name="message"
                  rows="7"
                  placeholder="Your message"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;