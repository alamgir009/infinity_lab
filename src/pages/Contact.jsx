import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from "react-icons/fi";
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
      icon: FiMessageCircle,
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
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative pt-12 pb-10 md:pt-16 md:pb-12">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface-sunken px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/80">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-brand dark:bg-accent-gold" />
            Start here
          </p>
          <h1 className="type-display mt-6 font-display text-text-on-brand">
            Contact
          </h1>
          <p className="container-text mt-5 text-lg leading-8 text-text-on-brand-muted">
            Tell us what you are building — or reach us directly using the
            details below.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="pt-10 pb-16 md:pb-20">
        <div className="container-section grid gap-12 lg:grid-cols-5">
          {/* Direct channels */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="contact-heading"
              eyebrow="Get in touch"
              title="Direct lines"
              lead="Prefer to talk first? Any of these channels reaches a real engineer."
            />
            <ul className="mt-10 space-y-3">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-[64px] items-center gap-4 rounded-card border border-border-subtle bg-surface-card p-4 shadow-card transition-[border-color,box-shadow] duration-150 hover:border-brand hover:shadow-card-hover"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-chip text-brand-chip-text transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                          {c.label}
                        </span>
                        <span className="block text-sm font-semibold text-text-primary break-all">
                          {c.text}
                          {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
              {CONTACT.address && (
                <li className="flex min-h-[64px] items-center gap-4 rounded-card border border-border-subtle bg-surface-card p-4 shadow-card">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-sunken text-text-secondary">
                    <FiMapPin size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                      Location
                    </span>
                    <span className="block text-sm font-semibold text-text-primary">
                      {CONTACT.address}
                    </span>
                  </span>
                </li>
              )}
            </ul>

            <aside className="mt-8 rounded-card border border-border-subtle bg-surface-sunken p-5">
              <h3 className="text-sm font-bold text-text-primary">
                A note on honesty
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                If you visit our Projects page you will see some links marked{" "}
                <span className="font-semibold text-text-primary">Unverified link</span>{" "}
                — those project domains no longer resolve. We keep them listed
                and marked honestly rather than pretending everything is live.
              </p>
            </aside>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="sm:p-1">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                  Start your project
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Required fields are marked with an asterisk (
                  <span aria-hidden="true" className="text-red-600 dark:text-red-400">*</span>
                  ).
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
