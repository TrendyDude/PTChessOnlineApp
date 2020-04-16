import React from 'react';
import StudentAnnouncementListComponent from './StudentAnnouncementListComponent';

export default function StudentAnnouncementList({announcements}) {
    return (
        announcements.map(announcement => {
            return <StudentAnnouncementListComponent key={announcement.idAnnouncement} announcement = {announcement} />
        })
    )
}