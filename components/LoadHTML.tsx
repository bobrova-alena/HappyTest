import React from 'react'
//import {loadHTML} from '../services/LoadService'
import Button from 'react-bootstrap/Button'


const LoadHTML = ()=>{
    let loadHTML = (event)=> {
        globalThis.addEventListener('message', function(event) {//todo
            alert(`Received ${event.data} from ${event.origin}`);
          });
        globalThis.pageViewer.src = URL.createObjectURL(event.target.files[0]);
    }
     

    return (
        <div>
            <input type="file" id="fileInput" onChange={(e) => loadHTML(e)}></input>
            <iframe id="pageViewer"></iframe>
        </div>
    )
}

export default LoadHTML