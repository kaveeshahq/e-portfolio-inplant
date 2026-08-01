import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import Reveal from "../components/Reveal"
import { faqs } from "../data/content"

export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <Reveal className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">FAQ</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">Frequently asked questions about the in-plant training program.</p>
      </Reveal>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 70}>
            <AccordionItem
              value={`item-${i}`}
              className="border border-indigo/20 rounded-lg px-4 bg-white shadow-sm transition-all duration-300 hover:border-indigo/50 hover:shadow-md"
            >
              <AccordionTrigger className="text-navy font-medium text-left hover:text-indigo hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-steel leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </div>
  )
}