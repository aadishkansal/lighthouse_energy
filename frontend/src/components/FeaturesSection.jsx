import { cn } from "../lib/utils";
import {
  IconCompass,
  IconTool,
  IconShieldCheck,
  IconDeviceAnalytics,
  IconHeadset,
  IconCurrencyDollar,
  IconFileCheck,
  IconTag,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Precision Engineering",
      description:
        "Custom solar plant designs by veteran engineers for maximum energy yield.",
      icon: <IconCompass />,
    },
    {
      title: "Certified Installation",
      description:
        "Flawless execution by expert technicians ensuring safety and roof integrity.",
      icon: <IconTool />,
    },
    {
      title: "5-Year Free O&M",
      description:
        "Complete peace of mind with zero-cost operation and maintenance for 5 years.",
      icon: <IconShieldCheck />,
    },
    {
      title: "Smart Solar Monitoring",
      description:
        "Track real-time generation and savings instantly via our dedicated app.",
      icon: <IconDeviceAnalytics />,
    },
    {
      title: "24/7 Rapid Support",
      description:
        "Technicians are one call away, round-the-clock, to keep your power flowing.",
      icon: <IconHeadset />,
    },
    {
      title: "Seamless Financing",
      description:
        "Easy loan approvals and flexible financing options to fund your solar journey.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Turnkey Solutions",
      description:
        "We handle it all: approvals, subsidies, net metering, and commissioning.",
      icon: <IconFileCheck />,
    },
    {
      title: "Unbeatable Affordability",
      description:
        "Tier-1 solar technology at market-leading prices for faster ROI.",
      icon: <IconTag />,
    },
  ];

  return (
    <div className="py-10 md:py-20 bg-white dark:bg-neutral-900">
      {/* --- Added Heading Section --- */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-700">
          Why choose us?
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          We combine cutting-edge technology with expert craftsmanship to
          deliver solar solutions.
        </p>
      </div>
      {/* ----------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  // The yellow-orange color from the solar panel image
  const hoverColor = "group-hover/feature:bg-[#EAB308]";
  const hoverTextColor = "group-hover/feature:text-[#EAB308]";

  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-400 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-400 to-transparent pointer-events-none" />
      )}
      <div
        className={cn(
          "mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 transition duration-200",
          hoverTextColor
        )}
      >
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className={cn(
            "absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-200 origin-center",
            hoverColor
          )}
        />
        <span
          className={cn(
            "group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100",
            hoverTextColor
          )}
        >
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
