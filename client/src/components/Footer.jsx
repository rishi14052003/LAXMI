import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const partners = [
    {
      name: 'Priya Sharma',
      role: 'Regional Manager',
      phone: '+91 9876543210',
      email: 'siddh2606@gmail.com'
    },
    {
      name: 'Rajesh Patel',
      role: 'Sales Lead',
      phone: '+91 9876543211',
      email: 'siddh2606@gmail.com'
    }
  ];

  const shopInfo = {
    name: "Laxmi Sarees",
    address: "R-3105 STM RING ROAD , NEW TEXTILE MARKET AREA , SURAT , GUJARAT , INDIA",
    phone: "+91 9099999309",
    email: "siddh2606@gmail.com",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM"
  };
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Collections', href: '#collections' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Shipping Info', href: '#shipping' }
  ];

  const categories = [
    { name: 'Silk Sarees', href: '#silk' },
    { name: 'Cotton Sarees', href: '#cotton' },
    { name: 'Bridal Collection', href: '#bridal' },
    { name: 'Designer Wear', href: '#designer' },
    { name: 'Banarasi Silk', href: '#banarasi' },
    { name: 'Kanjivaram Silk', href: '#kanjivaram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Shop Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/laxmi-logo.png" 
                alt="Laxmi Sarees Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <h3 className="text-xl font-bold text-yellow-400" style={{ display: 'none' }}>{shopInfo.name}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">{shopInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{shopInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{shopInfo.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">{shopInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.href}
                    className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Our Partners</h4>
            <div className="space-y-4">
              {partners.map((partner, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg">
                  <h5 className="font-medium text-white">{partner.name}</h5>
                  <p className="text-xs text-gray-400 mb-2">{partner.role}</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-gray-300">{partner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-gray-300">{partner.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2004 {shopInfo.name}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#shipping" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
