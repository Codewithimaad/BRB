import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      analytics: 'Analytics',
      blogs: 'Blogs',
      services: 'Services',
      countries: 'Countries',
      settings: 'Settings',
      new_blog: 'New Blog',
      new_service: 'New Service',
      new_country: 'New Country',
      search: 'Search',
      published: 'Published',
      draft: 'Draft',
      yes: 'Yes',
      no: 'No',
      featured: 'Featured',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      logout: 'Logout'
    }
  },
  ar: {
    translation: {
      analytics: 'التحليلات',
      blogs: 'المدونات',
      services: 'الخدمات',
      countries: 'الدول',
      settings: 'الإعدادات',
      new_blog: 'مدونة جديدة',
      new_service: 'خدمة جديدة',
      new_country: 'دولة جديدة',
      search: 'بحث',
      published: 'منشور',
      draft: 'مسودة',
      yes: 'نعم',
      no: 'لا',
      featured: 'مميّزة',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      logout: 'تسجيل الخروج'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;




