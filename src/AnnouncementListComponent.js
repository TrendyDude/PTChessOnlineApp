import React from 'react';

export default function AnnouncementListComponent({announcement}) {
    return (
        <tr>
            <td>
                {announcement.PostDate}
            </td>
            <td>
                {announcement.Description}
            </td>

        </tr>

    )
}