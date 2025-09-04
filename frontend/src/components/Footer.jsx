import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'; // Using react-icons for a modern look

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'about', href: '/about' },
    { key: 'countries', href: '/countries' },
    { key: 'blogs', href: '/blogs' },
    { key: 'contact', href: '/contact' },
  ];

  const serviceLinks = [
    { key: 'company_establishment', name: t('company_establishment'), href: '/services#company_establishment' },
    { key: 'external_company_acquisition', name: t('external_company_acquisition'), href: '/services#external_company_acquisition' },
    { key: 'taxes_and_budgets', name: t('taxes_and_budgets'), href: '/services#taxes_and_budgets' },
    { key: 'human_resources', name: t('human_resources'), href: '/services#human_resources' },
    { key: 'feasibility_study', name: t('feasibility_study'), href: '/services#feasibility_study' },
    { key: 'market_research', name: t('market_research'), href: '/services#market_research' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: '#' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#' },
    { name: 'Facebook', icon: <FaFacebookF />, href: '#' },
    { name: 'Instagram', icon: <FaInstagram />, href: '#' },
    { name: 'YouTube', icon: <FaYoutube />, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-900  text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info and Social Links */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              
              <span className="text-3xl font-extrabold text-white tracking-wide">BUSINESS REGISTRATION PORTAL</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-lg leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('our_services')}</h3>
            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <a
                    href={service.href}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} BRP. {t('all_rights_reserved')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">
              {t('privacy_policy')}
            </a>
            <a href="/terms" className="hover:text-white transition-colors duration-300">
              {t('terms_of_service')}
            </a>
            <a href="/cookies" className="hover:text-white transition-colors duration-300">
              {t('cookie_policy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}