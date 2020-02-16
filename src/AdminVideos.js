import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './AdminVideos.css';
import EditVideos from "./EditVideos";
import Dashboard from "./Login";

class AdminVideos extends React.Component{
    constructor(props) {
        super(props);
    }
 render() {
     return (
         <div lang="en">
             <title>AdminVideos</title>
             <div className="sidenav">
                 <h3> Welcome </h3>
                 <a onClick={gotoDashboard}>Dashboard</a>
                 <a href="#">Announcements</a>
                 <a href="#">Lessons</a>
                 <a href="#">Quizzes</a>
                 <a href="#">Videos</a>
                 <a href="#">Tactics</a>
             </div>

             <div className="content">

                 <div className="title">
                     <h1>AdminVideos</h1>
                 </div>
                 <div className="top">
                     <div id="sort">
                         <a href="#" className="active">ALL VIDEOS</a>
                         <a href="#">A-Z</a>
                         <a href="#">SORT BY DATE</a>
                     </div>
                     <div className="upload">
                         <button>Upload</button>
                     </div>
                 </div>
                 <div className="videos">
                     <svg width="1000" height="60">
                         <rect id="rect" width="1000" height="50" rx="15"/>
                         <foreignObject className="textInRect" x="0" y="0" width="100" height="50">
                             <button>Video 1</button>
                         </foreignObject>
                         <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">
                             <h1>Uploaded: 1/2/2019</h1>
                         </foreignObject>
                         <foreignObject className="edit" x="850" y="0" width="100" height="50">
                             <button onClick={gotoEdit}>Edit</button>
                         </foreignObject>
                         <svg width="1000" height="60">
                             <circle className="circ" r="10" cx="950" cy="25" fill="red"/>
                             <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">
                                 <button>X</button>
                             </foreignObject>
                         </svg>
                     </svg>
                     <svg width="1000" height="60">
                         <rect id="rect" width="1000" height="50" rx="15"/>
                         <foreignObject className="textInRect" x="0" y="0" width="100" height="50">
                             <button>Video 1</button>
                         </foreignObject>
                         <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">
                             <h1>Uploaded: 1/2/2019</h1>
                         </foreignObject>
                         <foreignObject className="edit" x="850" y="0" width="100" height="50">
                             <button onClick={gotoEdit}>Edit</button>
                         </foreignObject>
                         <svg width="1000" height="60">
                             <circle className="circ" r="10" cx="950" cy="25" fill="red"/>
                             <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">
                                 <button>X</button>
                             </foreignObject>
                         </svg>
                     </svg>
                 </div>
             </div>
         </div>
     );
 }
}
function gotoEdit() {
    ReactDOM.render(<EditVideos/>, document.getElementById('root'));
}

function gotoDashboard() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

export default AdminVideos