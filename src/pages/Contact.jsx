import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from "react-icons/fi";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import { CONTACT, SITE } from "../data/siteConfig";

export default function Contact() {
  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <>
      <Seo
        title={`Contact — ${SITE.name}`}
        description="Start your project with Infinity Lab. Reach us by phone, WhatsApp or email, or send an inquiry through the contact form."
        path="/contact"
      />

      <section className="bg-hero-gradient text-white">
        <div className="container-section py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Tell us what you are building — or reach us directly using the
              details below.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="py-16 md:py-24">
        <div className="container-section grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="contact-heading"
              eyebrow="Get in touch"
              title="Direct lines"
              lead="Prefer to talk first? Any of these channels reaches a real engineer."
            />
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-50 text-primary-700">
                  <FiPhone aria-hidden="true" size={20} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    Phone
                  </h3>
                  <a
                    href={telHref}
                    className="mt-1 inline-flex min-h-[44px] items-center text-sm text-slate-700 hover:text-primary-800"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-50 text-primary-700">
                  <FiMessageCircle aria-hidden="true" size={20} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    WhatsApp
                  </h3>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-[44px] items-center text-sm text-slate-700 hover:text-primary-800"
                  >
                    Message us on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-50 text-primary-700">
                  <FiMail aria-hidden="true" size={20} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    Email
                  </h3>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 inline-flex min-h-[44px] items-center text-sm text-slate-700 hover:text-primary-800 break-all"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
            {CONTACT.address && (
              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-50 text-primary-700">
                  <FiMapPin aria-hidden="true" size={20} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-900">
                    Location
                  </h3>
                  <p className="mt-1 text-sm text-slate-700">{CONTACT.address}</p>
                </div>
              </li>
            )}
            </ul>

            <aside className="mt-10 rounded-card border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">
                A note on honesty
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If you visit our Projects page you will see some links marked{" "}
                <span className="font-semibold">Unverified link</span> — those
                project domains no longer resolve. We keep them listed and
                marked honestly rather than pretending everything is live.
              </p>
            </aside>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Start your project
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Required fields are marked with an asterisk (
                <span aria-hidden="true" className="text-red-600">*</span>).
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
