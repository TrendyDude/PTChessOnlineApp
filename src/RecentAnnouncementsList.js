import React from 'react';
import RecentAnnouncementsComponent from './RecentAnnouncementsComponent';

export default function RecentAnnouncementsList({announcements}) {
    return (
        announcements.map(announcement => {
            return <RecentAnnouncementsComponent key={announcement.idAnnouncement} announcement = {announcement} />
        })
    )
}