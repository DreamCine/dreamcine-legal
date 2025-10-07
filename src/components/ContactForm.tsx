import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE_FORM_ID = "manpjank";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New message from ${name}`,   // заголовок письма
          _replyto: email,                        // reply-to
          _honeypot: "",                          // антиспам-поле (оставляем пустым)
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || "Failed to send message");
      }

      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setName(""); setEmail(""); setMessage("");
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 py-20" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300">Have questions? We'd love to hear from you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500"
              placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500"
              placeholder="your@email.com" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 min-h-[120px]"
              placeholder="Tell us about your project or question..." />
          </div>

          <Button type="submit" disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-3 hover:from-orange-600 hover:to-yellow-600 transition-all duration-300">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
