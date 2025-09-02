import React from 'react';
import './TagsSection.css';
import {Tag} from "../../../ui/Tag/Tag";

interface TagsSectionProps {
    tags: string[];
}

export const TagsSection: React.FC<TagsSectionProps> = ({tags}) => {
    return (
        <section className="tags-section">
            <h4>Tags</h4>
            <div className="tags-container">
                {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
        </section>
    );
};