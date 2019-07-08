import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './style/app.scss';

import mockData from './mock.json';

const API = 'http://taskmanager.us-east-2.elasticbeanstalk.com/tasks'

function Tasks() {

  const [Tasks, setTasks] = useState([]);

  const _getTasks = () => {
    // setTasks(mockData)
    // fetch from brook
    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( ppl => setTasks(ppl) )
    .catch( console.error );
    // setTasks(mockData);
  };

  const _toggleStatus = (e) => {
    // $status = ["availble"=>"availble", "assigned"=>"assigned","accpeted"=>"accepted","finished"=>"finished";];
    // e.preventDefault();
    // let id = e.target.id;

    // setTasks( Tasks.map( (task) =>
    //   task.id !== id ? task : {...task, status:$your_food[$category];}
    // ));

  
    // patch to Brooks api
    // fetch( `${API}/${id}/state`, {
    //   mode:'cors',
    //   method: 'PATCH'
    
    // })
    // .then(data => data.json())
    // .then(person => {
    //   setTasks( Tasks.map( (entry) => {
    //       return entry.id === id ? person : entry;
    //     }
    //   ));
    // })
    // .catch( console.error );

  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {Tasks.map( (task) =>
        <li className={`vip-${task.status}`} key={task.id}>
          <details>
            <summary>
              <span>{task.title}</span>
              <span>{task.assignee}</span>
              <span id={task.id} onClick={_toggleStatus}>{task.status.toString()}</span>

            </summary>
            <Description description={task.description} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Description(props) {
  let description = props.description || [];
  return (
    <section>
      {description}
      {/* {description.map( (item,idx) =>
        <div>
          {item.itemName}
        </div>
      )} */}
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