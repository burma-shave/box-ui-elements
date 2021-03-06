/**
 * @flow
 * @file Timeline component
 * @author Box
 */

import React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import Line from './Line';
import type { SkillCardEntryTimeSlice, SkillCardEntryType } from '../../flowTypes';
import './Timeline.scss';

type Props = {
    type?: SkillCardEntryType,
    color?: string,
    text?: string,
    url?: string,
    timeslices?: SkillCardEntryTimeSlice[],
    duration?: number,
    getPreviewer?: Function
};

const Timeline = ({
    type = 'text',
    color,
    text = '',
    url = '',
    duration = 0,
    timeslices = [],
    getPreviewer
}: Props) => {
    let nextSkillCardEntryTimeSliceIndex = 0;
    const startNextSegment = () => {
        const viewer = getPreviewer ? getPreviewer() : null;
        if (
            viewer &&
            viewer.isLoaded() &&
            !viewer.isDestroyed() &&
            typeof viewer.play === 'function' &&
            timeslices[nextSkillCardEntryTimeSliceIndex]
        ) {
            viewer.play(timeslices[nextSkillCardEntryTimeSliceIndex].start);
            nextSkillCardEntryTimeSliceIndex = (nextSkillCardEntryTimeSliceIndex + 1) % timeslices.length;
        }
    };

    return (
        <div className={`be-timeline be-timeline-${type}`}>
            {(text || url) && (
                <div className='be-timeline-label'>
                    {type === 'image' ? (
                        <PlainButton type='button' onClick={startNextSegment}>
                            <div className='be-timeline-image-container'>
                                <img alt={text} title={text} src={url} />
                            </div>
                        </PlainButton>
                    ) : (
                        <span>{text}</span>
                    )}
                </div>
            )}
            <div className='be-timeline-wrapper'>
                <div className='be-timeline-line' style={{ backgroundColor: color }} />
                {timeslices.map(
                    ({ start, end }: SkillCardEntryTimeSlice, index) => (
                        /* eslint-disable react/no-array-index-key */
                        <Line
                            key={index}
                            color={color}
                            type={type}
                            start={start}
                            end={end}
                            duration={duration}
                            getPreviewer={getPreviewer}
                        />
                    )
                    /* eslint-enable react/no-array-index-key */
                )}
            </div>
        </div>
    );
};

export default Timeline;
