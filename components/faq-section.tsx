import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "What is the Warzone Meta?",
    answer: "The Warzone Meta represents the most effective weapons, loadouts, and strategies currently dominating the game. Our daily updates reflect the latest patches, community discoveries, and pro player strategies to keep you ahead of the competition."
  },
  {
    question: "How do I optimize my Resurgence Ranked gameplay?",
    answer: "Optimize your strategies in Resurgence Ranked with our curated Meta analysis, designed for a variety of maps and tactics. We provide detailed insights for both long-range and close-quarters combat, helping you take your gameplay to the next level."
  },
  {
    question: "What are the best long-range weapons for Resurgence Ranked?",
    answer: "Excel at long-range combat in Resurgence Ranked with our Long Range Meta analysis. We provide detailed weapon insights for controlling expansive maps and securing victories from afar, focusing on Assault Rifles and Sniper Rifles that dominate the long-range meta."
  },
  {
    question: "How can I improve my close-range combat?",
    answer: "Dominate short-range encounters in Resurgence Ranked with our Close Range Meta analysis. We offer essential strategies for supremacy in confined environments, particularly focusing on SMGs and shotguns that excel in close-quarters combat."
  },
  {
    question: "Which SMGs are currently meta in Resurgence Ranked?",
    answer: "Enhance your Resurgence Ranked performance with our SMG Meta analysis. We deliver specialized tips for mastering submachine gun tactics, combining agility and firepower to dominate close-range engagements."
  },
  {
    question: "What are the top Assault Rifles in the current meta?",
    answer: "Progress in Resurgence Ranked with our AR Meta analysis. We present advanced insights for effective Assault Rifle usage, helping you achieve optimal accuracy and control in each conflict. Our recommendations are updated daily based on the latest game patches."
  },
  {
    question: "How can I master sniping in Resurgence Ranked?",
    answer: "Advance your Resurgence Ranked sniping skills with our Sniper Meta analysis. We provide in-depth tactics for sniper proficiency, ensuring precision in every engagement and helping you dominate long-range encounters."
  },
  {
    question: "What makes Battle Rifles effective in the current meta?",
    answer: "Amplify your Resurgence Ranked achievements with our Battle Rifle Meta analysis. We offer essential insights for superior rifle gameplay, making every engagement a step towards victory with the perfect balance of power and control."
  }
];

export function FAQSection() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="mt-8 bg-[#0F0F10] rounded-lg shadow-2xl">
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
      
      <div className="bg-[#F5B041] p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold text-black m-0">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      <p className="text-gray-400 mb-4 p-6">
        Essential information about Warzone Meta and strategies
      </p>

      <Accordion type="single" collapsible className="px-6 pb-6">
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b border-[#1d2433] last:border-b-0"
          >
            <AccordionTrigger className="py-4 hover:no-underline group">
              <span className="text-white font-medium group-hover:text-[#F5B041] transition-colors duration-200">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="py-4 text-gray-400">
              <p className="leading-relaxed">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

