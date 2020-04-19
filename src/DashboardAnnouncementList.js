import React from 'react';
import DashboardAnnouncementListComponent from './DashboardAnnouncementListComponent';

export default function DashboardAnnouncementList({announcements}) {
    var dog = announcements.length > 4 ? 4 : announcements.length == 0 ? 0 : announcements.length;

    return (
        announcements.slice(0, dog).map(announcement => {
            return <DashboardAnnouncementListComponent key={announcement.idAnnouncement} announcement = {announcement} />
        })
    )
}