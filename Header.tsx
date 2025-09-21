import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                پرو مجازی
            </h1>
            <p className="mt-3 text-lg text-gray-600">
                لباس‌ها را قبل از خرید، به صورت مجازی امتحان کنید
            </p>
        </header>
    );
};

export default Header;
