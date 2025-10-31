import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Do you offer LMS implementation support?",
    answer: "Yes, we offer complete LMS implementation services, including setup, customization, and training."
  },
  {
    question: "How scalable is tuttorz Learn for growing organizations?",
    answer: "tuttorz Learn is highly scalable and supports businesses of all sizes, from small teams to enterprises."
  },
  {
    question: "Can tuttorz Learn integrate with our existing systems?",
    answer: "Yes, it integrates seamlessly with various third-party applications and platforms."
  },
  {
    question: "What kinds of learning content can I upload to tuttorz Learn?",
    answer: "You can upload videos, PDFs, SCORM courses, quizzes, and more."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showFAQs, setShowFAQs] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <button
        onClick={() => setShowFAQs(!showFAQs)}
        className="w-full flex justify-between items-center text-2xl font-bold text-center mb-6 p-4 bg-orange-400 text-white rounded-lg"
      >
        Frequently Asked Questions on LMS Implementation and Use
        <span className="text-xl">{showFAQs ? "−" : "+"}</span>
      </button>

      {/* FAQ Section */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showFAQs ? "auto" : 0, opacity: showFAQs ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-lg font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 border-t bg-gray-50">{faq.answer}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;

