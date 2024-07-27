import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FaChevronDown } from 'react-icons/fa';
import { styled } from '@mui/system';

const Root = styled('div')({
  width: '100%',
});

const CustomAccordion = styled(Accordion)({
  backgroundColor: '#FFE5E5', // light red color
  margin: '8px 0',
});

const Summary = styled(AccordionSummary)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Icon = styled(FaChevronDown)({
  color: '#1C1C1C', // dark color for the icon
});

const Question = styled(Typography)({
  fontWeight: 'bold',
  color: '#1C1C1C',
});

const FAQ = () => {
  const faqData = [
    { question: "What is Devaseva?", answer: "Devaseva is..." },
    { question: "What are various services offered by Devaseva?", answer: "We offer..." },
    { question: "How can I trust Devaseva?", answer: "You can trust us by..." },
    { question: "Will I receive the same benefits if I am not physically present?", answer: "Yes, you will receive..." },
    { question: "Who conducts the pujas?", answer: "The pujas are conducted by..." },
    { question: "Where do you conduct the rituals?", answer: "The rituals are conducted at..." },
  ];

  return (
    <Root>
      {faqData.map((faq, index) => (
        <CustomAccordion key={index}>
          <Summary
            expandIcon={<Icon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Question>{faq.question}</Question>
          </Summary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </Root>
  );
};

export default FAQ;
