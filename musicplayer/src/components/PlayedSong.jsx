import React from 'react';

export const togglePanel = (setSanbr) => {
    setSanbr(prev => !prev);
};

const PlayedSong = () => {
    const [sanbr, setSanbr] = React.useState(false);

    return (
        <>
        </>
    );
};
export default PlayedSong;