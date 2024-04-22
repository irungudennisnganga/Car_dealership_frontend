import React,{useState} from 'react'

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="border border-gray-300 rounded-md mb-2 bg-cardbackground">
        <button
          onClick={toggleAccordion}
          className="w-full p-4 bg-gray-200 flex justify-between items-center"
        >
          <span>{title}</span>
          <span className={isOpen ? "transform rotate-180" : "transform rotate-0"}>
            ▼
          </span>
        </button>
        {isOpen && (
          <div className="p-4 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

export default AccordionItem