import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'about', href: '/about' },
    { key: 'countries', href: '/countries' },
    { key: 'blogs', href: '/blogs' },
    { key: 'contact', href: '/contact' },
  ];

  const services = [
    { key: 'company_establishment', name: t('company_establishment') },
    { key: 'external_company_acquisition', name: t('external_company_acquisition') },
    { key: 'taxes_and_budgets', name: t('taxes_and_budgets') },
    { key: 'human_resources', name: t('human_resources') },
    { key: 'feasibility_study', name: t('feasibility_study') },
    { key: 'market_research', name: t('market_research') },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', href: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', href: '#' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
    { name: 'YouTube', icon: 'fab fa-youtube', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-white">SATMB</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('hero_subtitle')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t('our_services')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t('our_services')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <a
                    href={`/services#${service.key}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-4">{t('newsletter')}</h3>
            <p className="text-gray-400 mb-4">{t('newsletter_desc')}</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder={t('enter_email_newsletter')}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SATMB. {t('all_rights_reserved')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t('privacy_policy')}
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t('terms_of_service')}
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              {t('cookie_policy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
