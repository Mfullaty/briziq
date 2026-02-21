import React from 'react';

const NoAccess = ({
    height = 100,
    width = 100,
}: {
    height?: number;
    width?: number;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            width={width}
            height={height}
        >
            <style>{`
                .ad-primary { fill: #393f4f; }
                .ad-secondary { fill: #bababa; }
                .ad-white { fill: #ffffff; }
            `}</style>

            {/* Background Circle */}
            <circle cx="200" cy="200" r="180" className="ad-secondary" />

            {/* Shield */}
            <path
                d="M200 70l105 40v85c0 80-55 125-105 145-50-20-105-65-105-145v-85l105-40z"
                className="ad-white"
            />

            {/* Lock Body */}
            <rect
                x="150"
                y="165"
                width="100"
                height="100"
                rx="12"
                className="ad-primary"
            />

            {/* Lock Shackle */}
            <path
                d="
                    M170 165
                    v-25
                    c0-30 20-50 50-50
                    s50 20 50 50
                    v25
                "
                className="ad-primary"
            />

            {/* Keyhole */}
            <circle cx="200" cy="215" r="12" className="ad-white" />
            <rect
                x="194"
                y="225"
                width="12"
                height="25"
                rx="6"
                className="ad-white"
            />
        </svg>
    );
};

export default NoAccess;
