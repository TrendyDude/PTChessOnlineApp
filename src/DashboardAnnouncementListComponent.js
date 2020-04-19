import React from 'react';
import './Dashboard.css';

export default function DashboardAnnouncementListComponent({announcement}) {
    return (
        <div className="item1">
            <div id="announcement_item">
                <p><strong>{announcement.PostDate}</strong></p>
                <p>{announcement.Description.length > 40 ?
                    announcement.Description.substring(0, 40) + "..." : announcement.Description}</p>
            </div>
        </div>


    )
}