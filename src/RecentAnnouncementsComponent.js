import React from 'react';

export default function RecentAnnouncementsComponent({announcement}) {
    return (

        <div className="item1">
            <div id="announcement_item">
                <p><strong>{announcement.PostDate}</strong></p>
                <p>{announcement.Description}</p>
            </div>
        </div>

    )
}