"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Envelope, Clock, PaperPlaneTilt } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".gsap-header"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(
        el.querySelectorAll(".gsap-col"),
        { opacity: 0, x: (i) => (i === 0 ? -50 : 50) },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your actual form submission logic
    // e.g., POST to /api/contact or use a third-party service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactItems = [
    {
      icon: MapPin,
      label: t.contact.address_label,
      value: t.contact.address,
      href: undefined,
    },
    {
      icon: Phone,
      label: t.contact.phone_label,
      value: t.contact.phone,
      href: `tel:${t.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Envelope,
      label: t.contact.email_label,
      value: t.contact.email,
      href: `mailto:${t.contact.email}`,
    },
    {
      icon: Clock,
      label: t.contact.working_hours_label,
      value: t.contact.working_hours,
      href: undefined,
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-28 bg-background tracking-tighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 gsap-header">
          <div className="flex justify-center mb-2">
            <Badge
              variant="outline"
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1"
            >
              {t.contact.section_title}
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-3 mb-4">
            {t.contact.section_subtitle}
          </h2>
          <Separator className="w-16 mx-auto h-0.5 bg-primary" />
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="border-border gsap-col">
            <CardContent className="p-6 lg:p-8 space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href }, idx) => (
                <div key={label} className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4.5 w-4.5" weight="fill" style={{ color: idx % 2 === 1 ? "#FE9D6F" : "#93CAF0" }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="text-center pt-2">
                <p className="text-sm font-bold italic" style={{ color: "#FE9D6F" }}>
                  &ldquo;{t.contact.thank_you}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Trung tâm Tư vấn Kiểm định Kỹ thuật Công trình
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-border gsap-col">
            <CardContent className="p-6 lg:p-8">
              <h3 className="font-bold text-foreground mb-5">
                {t.contact.send_message}
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
                  <PaperPlaneTilt className="h-10 w-10 text-primary" weight="fill" />
                  <p className="font-semibold text-foreground">
                    {t.contact.thank_you}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi sẽ liên hệ lại sớm nhất có thể.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Gửi tin nhắn khác
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t.contact.name_placeholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t.contact.email_placeholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder={t.contact.phone_placeholder}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                  <textarea
                    placeholder={t.contact.message_placeholder}
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                  />
                  <Button type="submit" className="w-full gap-2 font-semibold">
                    <PaperPlaneTilt className="h-4 w-4" weight="fill" />
                    {t.contact.submit_btn}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
