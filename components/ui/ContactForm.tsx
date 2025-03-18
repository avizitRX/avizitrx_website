import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Honeypot field to block bots
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok)
        throw new Error("Something went wrong. Please try again.");
      setSuccess(true);
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full rounded-2xl bg-white md:p-8 dark:bg-black">
      <form className="my-8 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="name" className="flex items-center text-md">
            <User className="mr-2 text-gray-500" /> Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="text-md autofill:bg-zinc-800 autofill:dark:bg-zinc-800"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email" className="flex items-center text-md">
            <Mail className="mr-2 text-gray-500" /> Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="text-md"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="message" className="flex items-center text-md">
            <MessageCircle className="mr-2 text-gray-500" /> Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="bg-zinc-800 dark:bg-zinc-800 text-md autofill:bg-zinc-800 autofill:dark:bg-zinc-800"
            required
          />
        </LabelInputContainer>
        {/* Honeypot field */}
        <input
          type="text"
          name="honeypot"
          className="hidden text-md"
          value={formData.honeypot}
          onChange={handleChange}
        />

        <InteractiveHoverButton
          type="submit"
          disabled={loading}
          className="bg-zinc-800"
        >
          {loading ? "Sending..." : "Send Message"}
        </InteractiveHoverButton>
      </form>
      {success && (
        <p className="text-green-500 text-md">
          Your message has been sent successfully!
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
