import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ 
  phoneNumber = '919876543210', 
  message = 'Hi! I would like to inquire about your products.',
  className = ''
}) => {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>Chat on WhatsApp</span>
    </button>
  );
};

export default WhatsAppButton;
