import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "Can I cancel at anytime?",
    answer:
      "Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
  },
  {
    question: "Why should I go solar?",
    answer:
      "If your monthly electricity bill is above INR 2000 on average, you have physical access to your rooftop, and if you want to make money from the sun, it makes absolute sense for you to go solar.",
  },
  {
    question: "What do I need to install a rooftop solar system?",
    answer:
      "All you need to qualify for a solar system is - empty space on your roof and access to your rooftop. Just fill the project enquiry form on our website and our team will contact you to discuss your requirement. Once the project is finalised, we will take care of your entire plant design, installation and maintenance.",
  },
  {
    question: "What is a solar rooftop system?",
    answer:
      "Solar Rooftop System consists of solar panels that are mounted up on your roof/terrace, unlike traditional Solar Systems which required extra land for setup. This reduces costs and increases utilization of space on your roof/terrace.",
  },
  {
    question: "How does a solar rooftop system work?",
    answer:
      "Solar Panels work on the principle of photo-voltaic effect (PV effect). Basically, when light energy hits the solar panel surface, the solar cells start conducting electricity due to the photo-electric property of semiconductors like silicon that make up a solar cell.",
  },
  {
    question: "What is the price of a solar system in India without a subsidy?",
    answer: [
      "If you are planning to install solar for home or housing societies, the solar panel for home price list we’ve curated will greatly help you. Here's the reference about the range of solar panels for home cost without a subsidy in India:",
      "2 kW rooftop solar system: ₹1,51,000 to ₹2,28,000",
      "3 kW rooftop solar system: ₹1,92,000 to ₹2,63,000",
      "4 kW rooftop solar system: ₹2,40,000 to ₹3,19,000",
      "5 kW rooftop solar system: ₹2,87,000 to ₹4,14,000",
      "7 kW rooftop solar system: ₹4,21,000 to ₹5,39,000",
      "10 kW rooftop solar system: ₹5,59,000 to ₹7,08,000",
    ],
  },
  {
    question: "What are the different types of Solar systems?",
    answer: [
      "There are 3 types of Solar systems depending on whether the plant is linked to the power grid or battery systems for storage.",

      "On-grid solar systems use common solar inverters and are connected to the public electricity grid. Any excess solar power that you generate is exported to the electricity grid and one usually get paid a feed-in-tariff or credits for the energy you export. The policy for getting credits for energy exported to the credit is termed as “Net-Metering Policy” and is available currently in most states of India.",

      "Off-grid solar systems are not connected to the electricity grid and therefore requires battery storage. An off-grid solar system must be designed appropriately so that it will generate enough power throughout the year and have enough battery capacity to meet the home’s requirements, even in the depths of winter when there is less sunlight.",

      "Hybrid solar systems combines solar and battery storage in one and are now available in many different forms and configurations. This means being able to store solar energy that is generated during the day and using it at night. When the stored energy is depleted, the grid is there as backup, allowing consumers to have the best of both worlds.",
    ],
  },
  {
    question:
      "Do solar panels generate electricity even during monsoon and winter?",
    answer:
      "Yes, Solar panels do produce electricity in cloudy or rainy weather albeit with reduced efficiency. This fall in production is considered in the unit generation estimates provided for every project.",
  },
  {
    question: "How much electricity does a solar plant produce?",
    answer:
      "The production level of a solar plant depends on multiple factors like radiation levels, amount of sunlight received, plant design and quality of components. On an average, 1 kW solar plant produces 4 units of electricity per day.",
  },
  {
    question: "What is Net metering?",
    answer:
      "Net Metering is a system that gives solar energy owners credits for the power that they add to the grid. When solar panels produce excess power, that power is sent to the grid. And this power can be ‘taken back’ when the solar plants are not functioning – example, during the night. When a unit of solar energy that has been ‘net metered’, the bi-directional electricity meter will run backwards. Customers are billed only for the ‘net’ energy use.",
  },
  {
    question: "How do I decide what size of plant I need?",
    answer: [
      "The size of your Solar plant depends on the following factors",

      "Your electricity consumption pattern",
      "Available shadow free area",
      "Solar irradiation in your area",
      "Once you enlist your interest in a solar project, We conducts a scientific mapping of the appropriate project size for you.",
    ],
  },

  {
    question: "What is the life of a rooftop solar system?",
    answer:
      "The Solar Plant life is 25 years. The main components are solar panels and inverters. Solar panels have a warranty of 25 years and inverter warranty ranges from 5-12 years.",
  },
  {
    question: "Do Solar Rooftop projects have a high maintenance cost?",
    answer:
      "A Solar Rooftop module comprises minimal moving parts and hence has very low maintenance cost. SolarSquare Energy provides first 5-year maintenance free of cost to clients ensuring a hassle free experience for all our customers.",
  },
  {
    question: "Do l need to clean my Solar plant?",
    answer:
      "It is a good practice to clean the solar panels 1-2 times a month. It is safer to clean the panels early in the morning or at night when no incident sun rays are present and the power plant is not producing any electricity. You can simply use a clean wet cloth, soft nylon brush or sponge to wipe the surface but ensure the panels are clear of any moisture. Don’t use metal brushes or detergents as these may streak the glass of the panel.",
  },
  {
    question: "How much does a solar Plant cost?",
    answer:
      "The answer depends on a number of factors like grid type, system size, specifications of the system, your electricity consumption pattern, etc. When you schedule a solar site assessment, our engineers visit your premises, they evaluate the feasibility of solar power system on your rooftop by analyzing a number of engineering parameters like shadow profiling, design 3D-structure layouts, etc. to determine the most optimized system size at the best price for you.",
  },
  {
    question: "What is the break-even period for Solar rooftop projects?",
    answer:
      "Rooftop solar projects are among the most lucrative investments for industrial, commercial and residential projects. The breakeven is achieved in 2-4 years itself, while you enjoy savings for the project life of 25 years.",
  },
  {
    question: "Are financing options available for Solar Rooftop projects?",
    answer:
      "LightHouse Energy provides lucrative EMI options while also facilitating collateral free loan facilities provided by various banking institutions for solar projects.",
  },
  {
    question:
      "Are there any subsidies provided by the government for solar projects?",
    answer: {
      info: "Below are the main government subsidy slabs for residential solar projects in India:",
      table: [
        { segment: "Individual house", projectSize: "1kW", subsidy: "₹30,000" },
        { segment: "Individual house", projectSize: "2kW", subsidy: "₹60,000" },
        {
          segment: "Individual house",
          projectSize: "Above 3kW",
          subsidy: "₹78,000",
        },
        {
          segment: "Group Housing Societies/Residential Welfare Associations",
          projectSize: "Per kW",
          subsidy: "₹18,000/kw",
        },
      ],
      additional_state_subsidy:
        "At present, the Uttar Pradesh state government provides an additional solar subsidy of ₹15,000 per kw (max ₹30,000) when you install a rooftop solar system, bringing the total maximum subsidy amount to ₹1,08,000.",
    },
  },
];

export default function FAQs() {
  return (
    <>
      <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Your questions, answered
          </h2>
          <p className="mt-1 text-muted-foreground">
            Answers to the most frequently asked questions.
          </p>
        </div>
        {/* End Title */}

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : Array.isArray(faq.answer) ? (
                    <ul className="list-disc pl-5">
                      {faq.answer.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : typeof faq.answer === "object" && faq.answer.table ? (
                    <>
                      <p>{faq.answer.info}</p>
                      <table className="mt-4 w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="border p-2 text-left">Segment</th>
                            <th className="border p-2 text-left">
                              Solar Project size
                            </th>
                            <th className="border p-2 text-left">Subsidy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faq.answer.table.map((row, idx) => (
                            <tr key={idx}>
                              <td className="border p-2">{row.segment}</td>
                              <td className="border p-2">{row.projectSize}</td>
                              <td className="border p-2">{row.subsidy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-4">
                        {faq.answer.additional_state_subsidy}
                      </p>
                    </>
                  ) : (
                    <p>{JSON.stringify(faq.answer)}</p> // Fallback for other objects
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
