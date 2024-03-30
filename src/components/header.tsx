import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                {/* Add your logo component here */}
            </div>
            <div className="text">
                {/* Add your text component here */}
            </div>
            <div className="actions">
                <button>Sign In</button>
                <button>Toggle Modal</button>
            </div>
        </header>
    );
};

export default Header;