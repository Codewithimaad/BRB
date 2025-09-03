# Translation System Guide

## Overview
This project uses `react-i18next` for internationalization (i18n) with support for English (en) and Arabic (ar) languages. The system automatically handles RTL (Right-to-Left) layout for Arabic and LTR (Left-to-Right) for English.

## How It Works

### 1. Language Detection
- **Automatic Detection**: The system automatically detects the user's preferred language from browser settings
- **Local Storage**: User's language preference is saved in localStorage and persists across sessions
- **Fallback**: Defaults to English if no preference is detected

### 2. Language Switching
- **Language Switcher Component**: Located in the top navigation bar
- **Instant Updates**: All components automatically re-render when language changes
- **RTL/LTR Support**: Document direction automatically switches between RTL (Arabic) and LTR (English)

### 3. Translation Files
- **English**: `src/i18n/en.json`
- **Arabic**: `src/i18n/ar.json`
- **Structure**: Both files contain the same keys with translated values

## Adding New Translations

### 1. Add Translation Keys
```json
// In en.json
{
  "new_key": "English text here"
}

// In ar.json
{
  "new_key": "النص العربي هنا"
}
```

### 2. Use in Components
```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("new_key")}</h1>
    </div>
  );
}
```

## RTL Support

### 1. Automatic Direction Switching
- **Arabic**: Automatically sets `dir="rtl"` and `lang="ar"`
- **English**: Automatically sets `dir="ltr"` and `lang="en"`

### 2. CSS Classes for RTL
```css
/* RTL-specific adjustments */
[dir="rtl"] .rtl-flip { transform: scaleX(-1); }
[dir="rtl"] .rtl-rotate { transform: rotate(180deg); }
[dir="rtl"] .rtl-ml { margin-left: 0; margin-right: 0.25rem; }
```

### 3. Component Considerations
- **Icons**: Use `rtl-flip` class for icons that need to be mirrored in RTL
- **Margins/Padding**: Use `rtl-ml` and `rtl-mr` classes for language-specific spacing
- **Text Alignment**: Consider using `text-right` for Arabic and `text-left` for English

## Best Practices

### 1. Translation Keys
- **Descriptive Names**: Use descriptive key names (e.g., `hero_title` instead of `title1`)
- **Consistent Naming**: Follow a consistent naming convention
- **Hierarchical Structure**: Use dots for nested structures (e.g., `form.email.label`)

### 2. Component Structure
- **Always Use Translation Hook**: Import and use `useTranslation()` in every component
- **Avoid Hardcoded Text**: Never hardcode text strings in components
- **Fallback Values**: Provide meaningful fallback values for missing translations

### 3. RTL Considerations
- **Flexbox Direction**: Use `flex-row-reverse` for RTL layouts when needed
- **Icon Direction**: Consider icon direction for RTL languages
- **Number Formatting**: Be aware of number formatting differences

## Troubleshooting

### 1. Translations Not Updating
- **Check Hook Usage**: Ensure `useTranslation()` is imported and used
- **Verify Keys**: Check that translation keys exist in both language files
- **Language Change Event**: Ensure the language change event is properly dispatched

### 2. RTL Layout Issues
- **Check Document Attributes**: Verify `dir` and `lang` attributes are set correctly
- **CSS Specificity**: Ensure RTL CSS rules have proper specificity
- **Component Re-renders**: Verify components re-render when language changes

### 3. Performance Issues
- **Translation Caching**: i18next automatically caches translations
- **Component Optimization**: Use React.memo for components that don't need frequent updates
- **Bundle Size**: Consider code-splitting for large translation files

## Example Implementation

```jsx
import { useTranslation } from "react-i18next";
import { useLanguageChange } from "../hooks/useLanguageChange";

function ExampleComponent() {
  const { t } = useTranslation();
  const currentLanguage = useLanguageChange();
  
  return (
    <div className={`text-${currentLanguage === 'ar' ? 'right' : 'left'}`}>
      <h1>{t("example_title")}</h1>
      <p>{t("example_description")}</p>
      <button className="rtl-flip">
        {t("example_button")}
      </button>
    </div>
  );
}
```

## File Structure
```
src/
├── i18n/
│   ├── index.js          # i18n configuration
│   ├── en.json          # English translations
│   └── ar.json          # Arabic translations
├── hooks/
│   └── useLanguageChange.js  # Custom hook for language changes
└── components/
    └── LanguageSwitcher.jsx  # Language switching component
```

## Dependencies
- `react-i18next`: React integration for i18next
- `i18next`: Core internationalization framework
- Custom hooks for language change detection
- CSS utilities for RTL support

This translation system provides a robust foundation for multilingual applications with automatic RTL support and seamless language switching.



