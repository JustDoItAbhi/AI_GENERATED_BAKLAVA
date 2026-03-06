import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ language, setLanguage, t }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                                B
                            </div>
                            <span className="font-bold text-xl md:text-2xl text-darkbrown tracking-tight">
                                {t.shopTitle}
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/admin" className="text-darkbrown hover:text-gold text-sm font-medium transition-colors hidden sm:block">
                            {t.adminLink}
                        </Link>
                        <LanguageSwitcher language={language} setLanguage={setLanguage} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
