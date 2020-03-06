import React from 'react';
import AnnouncementListComponent from './AnnouncementListComponent';

export default function AnnouncementList({announcements}) {
    return (
        announcements.map(announcement => {
            return <AnnouncementListComponent key={announcement.idAnnouncement} announcement = {announcement} />
        })
    )
}