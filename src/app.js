import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './style/app.scss';

import mockData from './mock.json';

const API = 'http://taskmanager.us-east-2.elasticbeanstalk.com/tasks'

function Tasks() {

  const [Tasks, setTasks] = useState([]);

  const _getTasks = () => {

    // To use local json file:
    // setTasks(mockData)

    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( task => setTasks(task) )
    .catch( console.error );
    // setTasks(mockData);
  };

  const _toggleStatus = (e) => {
    e.preventDefault();
    let id = e.target.id;
  
    fetch( `${API}/${id}/state`, {
      mode:'cors',
      method: 'PUT'
    
    })
    .then(data => data.json())
    .then(task => {
      setTasks( Tasks.map( (entry) => {
          return entry.id === id ? task : entry;
        }
      ));
    })
    .catch( console.error );
  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {Tasks.map( (task) =>
        <li className={`vip-${task.status}`} key={task.id}>
          <details>
            <summary>

              <span>Status: 
              <button className={`button status-${task.status}`} id={task.id} onClick={_toggleStatus}>{task.status}</button>
              </span>

              <span>Title: <span className="userdata">{task.title}</span></span>

              <form className="push" action={`${API}/${task.id}/images`} method="post" encType="multipart/form-data">
              <label>
                <span>Upload Image: </span>
                <input name="file" type="file" />
              </label>
              <button>Submit</button>
              </form>
            </summary>
            <Description task={task} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Description(props) {
  let description = props.task.description || [];
  let image = props.task.pic || [];
  let assignee = props.task.assignee || [];
  return (
    <section>
      Assignee Name: <span className="userdata">{assignee}</span>
      <br></br>
      Description: <span className="userdata">{description}</span>
      <br></br>
      Uploaded Image: <br></br>
      <img src={image} alt={image} />
    </section>
  )
}

function App() {
  return (
    <>
      <header>Taskmanager</header>
      <main>
        <Tasks />
      </main>
      <footer>&copy; 2019 Klempd</footer>
      </>
  );
}

export default App;