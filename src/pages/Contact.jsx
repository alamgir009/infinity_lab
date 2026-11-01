import { FiMail, FiPhone, FiMapPin, FiShield } from "react-icons/fi";
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
      color: "group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: waHref,
      text: "Message us on WhatsApp",
      external: true,
      color: "group-hover:border-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    {
      id: "email",
      icon: FiMail,
      label: "Email",
      href: `mailto:${CONTACT.email}`,
      text: CONTACT.email,
      external: false,
      color: "group-hover:border-teal-400 group-hover:text-teal-600 dark:group-hover:text-teal-400",
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
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative pt-10 pb-12 md:pt-14 md:pb-16">
          <h1 className="type-display font-heading text-text-on-brand tracking-tight">
            Contact
          </h1>
          <p className="container-text mt-4 text-lg leading-relaxed text-text-on-brand-muted sm:text-xl">
            Tell us what you are building — or reach us directly using the
            details below.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="container-section grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Direct channels */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="contact-heading"
              eyebrow="Get in touch"
              title="Direct lines"
              lead="Prefer to talk first? Any of these channels reaches a real engineer."
            />
            <ul className="mt-10 space-y-3.5">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-[68px] items-center gap-4 rounded-card border border-border-subtle bg-surface-card p-4 shadow-card card-rim transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover dark:border-slate-800 dark:hover:border-slate-700"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-brand-chip text-brand-chip-text transition-colors duration-200 group-hover:bg-brand group-hover:text-white dark:bg-surface-sunken dark:text-brand dark:group-hover:bg-brand dark:group-hover:text-surface">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                          {c.label}
                        </span>
                        <span className="block text-sm font-bold text-text-primary break-all">
                          {c.text}
                          {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
              {CONTACT.address && (
                <li className="flex min-h-[68px] items-center gap-4 rounded-card border border-border-subtle bg-surface-card p-4 shadow-card card-rim dark:border-slate-800">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-btn border border-border-subtle bg-surface-sunken text-text-secondary">
                    <FiMapPin size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                      Location
                    </span>
                    <span className="block text-sm font-bold text-text-primary">
                      {CONTACT.address}
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 sm:p-8 lg:p-10 card-rim shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-5">
                <div>
                  <h2 className="font-subheading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                    Start your project
                  </h2>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    Required fields are marked with an asterisk (
                    <span aria-hidden="true" className="text-red-500 font-bold">*</span>
                    ).
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-sunken/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
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
