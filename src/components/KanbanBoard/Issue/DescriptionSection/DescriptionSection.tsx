import React from 'react';
import './DescriptionSection.css';

export const DescriptionSection: React.FC = () => {
    return (
        <section className="description-section">
            <h3>Description</h3>
            <div className="issue-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.</p>
            </div>
        </section>
    );
};