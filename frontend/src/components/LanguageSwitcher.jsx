import React from 'react';

const LanguageSwitcher = ({ language, setLanguage }) => {
    return (
        <div className="flex border border-gold rounded overflow-hidden shadow-sm hover:shadow transition-shadow">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium transition-colors ${language === 'en'
                        ? 'bg-gold text-white'
                        : 'bg-white text-darkbrown hover:bg-cream'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('ua')}
                className={`px-3 py-1 text-sm font-medium transition-colors ${language === 'ua'
                        ? 'bg-gold text-white'
                        : 'bg-white text-darkbrown hover:bg-cream'
                    }`}
            >
                UA
            </button>
        </div>
    );
};

export default LanguageSwitcher;
