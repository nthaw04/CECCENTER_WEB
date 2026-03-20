"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      return;
    }

    setIsSending(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          sent_at: new Date().toLocaleString(locale === "vi" ? "vi-VN" : "en-US"),
        },
        { publicKey }
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.201746080999!2d106.741211575485!3d10.87225465741795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527f5a144c4ab%3A0x7617682c8612a3b7!2zMzAyIMSQLiBHw7IgRMawYSwgVGFtIELDrG5oLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1774010748513!5m2!1svi!2s";

  return (
    <section id="contact" className="py-8 lg:py-12 bg-background tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-border bg-card/50">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
            <div className="bg-card p-6 lg:p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cec-accent-2 text-cec-accent-2">
                    <MapPinIcon className="h-4 w-4" weight="fill" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.contact.address}</p>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cec-accent-2 text-cec-accent-2">
                    <PhoneIcon className="h-4 w-4" weight="fill" />
                  </span>
                  <a href={`tel:${t.contact.phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cec-accent-2 text-cec-accent-2">
                    <EnvelopeIcon className="h-4 w-4" weight="fill" />
                  </span>
                  <a href={`mailto:${t.contact.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t.contact.email}
                  </a>
                </li>
              </ul>

              <Separator className="my-6" />

              <h3 className="text-3xl font-semibold text-foreground mb-4">
                {locale === "vi" ? "Liên hệ với chúng tôi" : "Contact us"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t.contact.name_placeholder}
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="email"
                  placeholder={t.contact.email_placeholder}
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <textarea
                  rows={4}
                  placeholder={t.contact.message_placeholder}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  required
                  className="w-full resize-none rounded-3xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button
                  type="submit"
                  disabled={isSending}
                  className="h-11 bg-cec-accent-2 rounded-full px-10 text-sm font-semibold text-white"
                >
                  {isSending
                    ? locale === "vi"
                      ? "Đang gửi..."
                      : "Sending..."
                    : locale === "vi"
                    ? "Gửi liên hệ"
                    : "Send message"}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-sm text-green-600">
                    {locale === "vi"
                      ? "Gửi email thành công. Chúng tôi sẽ phản hồi sớm."
                      : "Email sent successfully. We will get back to you soon."}
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="text-sm text-red-600">
                    {locale === "vi"
                      ? "Không thể gửi email. Vui lòng kiểm tra cấu hình EmailJS hoặc thử lại sau."
                      : "Unable to send email. Please check EmailJS configuration or try again later."}
                  </p>
                )}
              </form>
            </div>

            <div className="min-h-105 lg:min-h-full">
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CEC Center Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
