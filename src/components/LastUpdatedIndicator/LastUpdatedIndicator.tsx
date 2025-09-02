import React from 'react';
import cx from 'classnames';
import './LastUpdatedIndicator.css';
import {Size} from "../../types";

export interface LastUpdatedIndicatorProps {
    lastUpdated?: Date;
    isFetching?: boolean;
    className?: string;
    size?: Size;
    variant?: 'default' | 'minimal' | 'detailed';
    showLivePulse?: boolean;
    format?: 'time' | 'datetime' | 'relative';
}

export const LastUpdatedIndicator = (props: LastUpdatedIndicatorProps) => {
    const {
        lastUpdated,
        isFetching = false,
        className,
        size = 'medium',
        variant = 'default',
        showLivePulse = true,
        format = 'time'
    } = props;

    if (!lastUpdated) return null;

    const formatDate = (date: Date): string => {
        switch (format) {
            case 'datetime':
                return date.toLocaleString();
            case 'relative':
                return getRelativeTime(date);
            case 'time':
            default:
                return date.toLocaleTimeString();
        }
    };

    const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const containerClasses = cx(
        'last-updated-indicator',
        `last-updated-indicator--${size}`,
        `last-updated-indicator--${variant}`,
        {
            'last-updated-indicator--fetching': isFetching,
            'last-updated-indicator--live': showLivePulse && isFetching
        },
        className
    );

    return (
        <div className={containerClasses}>
            <div className="last-updated-indicator__content">
                <span className="last-updated-indicator__label">Updated: </span>
                <span className="last-updated-indicator__time">
                    {formatDate(lastUpdated)}
                </span>

                {showLivePulse && isFetching && (
                    <div className="last-updated-indicator__status">
                        <div className="last-updated-indicator__pulse"/>
                        <span className="last-updated-indicator__status-text">Live</span>
                    </div>
                )}

                {!showLivePulse && isFetching && (
                    <div className="last-updated-indicator__loading">
                        <div className="last-updated-indicator__spinner"/>
                    </div>
                )}
            </div>
        </div>
    );
};