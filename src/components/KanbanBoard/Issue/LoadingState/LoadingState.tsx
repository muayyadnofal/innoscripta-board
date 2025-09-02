import React from 'react';
import './LoadingState.css';
import {Spinner} from "../../../ui/Spinner/Spinner";

export const LoadingState: React.FC = () => {
    return (
        <div className="loading-state">
            <Spinner size="lg"/>
            <p>Loading issue details...</p>
        </div>
    );
};