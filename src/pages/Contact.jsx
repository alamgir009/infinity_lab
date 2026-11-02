import { FiMail, FiPhone, FiMapPin, FiShield, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import Card from "../components/ui/Card";
import { CONTACT, SITE } from "../data/siteConfig";

export default function Contact() {
  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`;

  const channels = [
    {
      id: "phone",
      icon: FiPhone,
      label: "Phone",
      href: telHref,
      text: CONTACT.phone,
      external: false,
    },
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: waHref,
      text: "Message us on WhatsApp",
      external: true,
    },
    {
      id: "email",
      icon: FiMail,
      label: "Email",
      href: `mailto:${CONTACT.email}`,
      text: CONTACT.email,
      external: false,
    },
  ];

  return (
    <>
      <Seo
        title={`Contact — ${SITE.name}`}
        description="Start your project with Infinity Lab. Reach us by phone, WhatsApp or email, or send an inquiry through the contact form."
        path="/contact"
      />

      {/* Page hero */}
      <section className="relative overflow-hidden">
        <div className="container-section pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="mb-8 flex items-center gap-3" aria-hidden="true">
            <span className="signal-tick" />
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="type-display text-text-primary">Contact</h1>
              <div className="signal-rule mt-7 w-20" aria-hidden="true" />
            </div>
            <div className="lg:col-span-5">
              <p className="type-lead max-w-[52ch] text-text-secondary">
                Tell us what you are building — or reach us directly using the
                details below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="section pt-4 md:pt-6">
        <div className="container-section grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Direct channels */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="contact-heading"
              index="01"
              eyebrow="Get in touch"
              title="Direct lines"
              lead="Prefer to talk first? Any of these channels reaches a real engineer."
            />

            <ul className="mt-10 border-t border-border-subtle">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.id} className="border-b border-border-subtle">
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-[76px] items-center gap-4 py-4 transition-colors duration-150"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text transition-colors duration-200 group-hover:bg-btn-bg group-hover:text-btn-text">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                          {c.label}
                        </span>
                        <span className="mt-1 block break-all text-sm font-semibold text-text-primary">
                          {c.text}
                          {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                        </span>
                      </span>
                      <FiArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                    </a>
                  </li>
                );
              })}
              {CONTACT.address && (
                <li className="flex min-h-[76px] items-center gap-4 border-b border-border-subtle py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-surface-sunken text-text-secondary">
                    <FiMapPin size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                      Location
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-text-primary">
                      {CONTACT.address}
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-5">
                <div>
                  <h2 className="font-display text-3xl leading-none tracking-[-0.03em] text-text-primary">
                    Let’s connect!
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    Required fields are marked with an asterisk (
                    <span aria-hidden="true" className="font-semibold text-danger">*</span>
                    ).
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-border-subtle bg-surface-sunken/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-text-muted">
                  <FiShield aria-hidden="true" className="size-3 text-brand" />
                  Direct Intake
                </span>
              </div>
              <div className="mt-7">
                <ContactForm />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
