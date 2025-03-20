import {
  FaEnvelope,
  FaLocationDot,
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
  FaDribbble,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const socialLinks = [
  {
    href: "https://www.instagram.com/avizitrx",
    label: "Instagram",
    icon: <FaInstagram className="w-6 h-6" />,
  },

  {
    href: "https://www.linkedin.com/in/avizitrx/",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-6 h-6" />,
  },
  {
    href: "https://x.com/avizitRX",
    label: "X (Twitter)",
    icon: <FaSquareXTwitter className="w-6 h-6" />,
  },

  {
    href: "https://dribbble.com/avizitRX",
    label: "Dribbble",
    icon: <FaDribbble className="w-6 h-6" />,
  },
  {
    href: "https://github.com/avizitRX",
    label: "GitHub",
    icon: <FaGithub className="w-6 h-6" />,
  },
  {
    href: "https://t.me/avizitRX",
    label: "Telegram",
    icon: <FaTelegram className="w-6 h-6" />,
  },
];

const ContactInfo = () => {
  const user = "contact";
  const domain = "avizitrx";
  const tld = "com";

  const email = `${user}@${domain}.${tld}`;
  const mailto = `mailto:${email}`;

  return (
    <div className="flex flex-col justify-end md:my-20 space-y-4">
      <div className="flex items-center max-sm:justify-center space-x-3">
        {/* Email */}
        <FaEnvelope className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
        <div className="flex items-center space-x-3">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            <a href={mailto} className="hover:underline">
              {email}
            </a>
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center max-sm:justify-center space-x-3">
        <FaLocationDot className="w-5 h-5 text-neutral-800 dark:text-neutral-300" />
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Dhaka, Bangladesh
        </p>
      </div>

      {/* Social Icons */}
      <TooltipProvider>
        <div className="flex items-center max-sm:justify-center space-x-4 my-4">
          {socialLinks.map((social, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 transition-colors"
                  aria-label={`Visit ${social.label}`}
                >
                  {social.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent>{social.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ContactInfo;
