import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';



function Dashboard() {
    return (
        <html lang="en">

        <head>
            <title>Dashboard</title>
        </head>

        <body>
            <div className="sidenav">
                <h3> Welcome Ally!</h3>
                <a>Dashboard</a>
                <a href="#">Announcements</a>
                <a href="#">Lessons</a>
                <a href="#">Quizzes</a>
                <a href="#">Videos</a>
                <a href="#">Tactics</a>
            </div>

            <div className="content">

                <div className="title">
                    <h1>Dashboard</h1>
                </div>

                <div className = "top_section">
                <p>This Week's Lesson:</p>
                <div className="boxes">
                    <h2>Moving Pieces <button>View</button> </h2>

                </div>
                <p>Daily Tactic:</p>
                <div className="boxes">
                    <h2>Pawns <button >View</button></h2>

                </div>
                </div>
                <table width="100%">
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
                <table width="100%">
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
export default Dashboard