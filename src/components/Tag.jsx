import React from 'react';
import './Tag.css';

export const Tag = ({ tag }) => {
    if(!tag) return null;
    return (
        <span className="tag" style={{ backgroundColor: tag.color }}>
            {tag.text}
        </span>
    );
};

