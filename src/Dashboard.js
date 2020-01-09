import React from 'react';
import './App.css';

function Dash() {
    return (
        <html lang="en">
        <head>
            <title>Dashboard</title>
        </head>

        <body>
        <div className="sidenav">
            <a className={Dashboard}>Dashboard</a>
            <a href="#">Lessons</a>
            <a href="#">Videos</a>
            <a href="#">Quizzes</a>
        </div>

        <div className="title">
            <h1>Dashboard</h1>
        </div>

        <div className="content">
            <p>This Week's Lesson:</p>
            <div className="boxes">
                <h2 style="display:inline">Moving Pieces</h2>
                <button onClick={Dashboard}>View</button>
            </div>
            <p>Daily Tactic:</p>
            <div className="boxes">
                <h2 style="display:inline">Pawns</h2>
                <button>View</button>
            </div>
            <table style="width:100%">
                <tr>
                    <th colSpan="3">Announcements</th>
                </tr>
                <tr>
                    <td className="date">10/17/19</td>
                    <td>Hi Class! Remember to bring your pamphlet to class and we'll be testing out
                        some new chess strategies with...
                    </td>

                </tr>
                <tr>
                    <td className="date">10/15/19</td>
                    <td>Don't forget to do your homework! It's due by 11:59pm and I will not be giving
                        out homework extensions si...
                    </td>

                </tr>
            </table>
            <table style="width:100%">
                <tr>
                    <th colSpan="2">Quizzes</th>
                </tr>
                <tr>
                    <td className="date">10/17/19</td>
                    <td>Week 1: Checkmate</td>

                </tr>
                <tr>
                    <td className="date">10/24/19</td>
                    <td>Week 2: Pieces</td>

                </tr>
                <tr>
                    <td className="date">10/31/19</td>
                    <td>Week 3: Fork</td>

                </tr>
            </table>
        </div>

        </body>
        </html>
    );
}