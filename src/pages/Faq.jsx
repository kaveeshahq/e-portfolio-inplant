import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { faqs } from "../data/content"

export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-3">FAQ</h1>
        <div className="w-16 h-1 bg-indigo mx-auto rounded mb-4" />
        <p className="text-steel">Frequently asked questions about the in-plant training program.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-indigo/20 rounded-lg px-4 bg-white shadow-sm"
          >
            <AccordionTrigger className="text-navy font-medium text-left hover:text-indigo hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-steel leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}