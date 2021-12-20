import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {} from 'reactstrap';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {

  const baseurl="https://localhost:7178/load";
  
  const [data,setData]=useState([]);
  const [modalEdit, setModalEdit]=useState(false);
  const [modalInsert, setModalInsert]=useState(false);
  const [loadselected, setloadselected]=useState({
    vendor_name:'',
    id_load_type:'',
    leg_date:'',
    created_by:''
  });
  
  const handlechange=e=>{
    const {name,value}=e.target;
    setloadselected({
      ...loadselected,
      [name]:value
    });
    console.log(loadselected);
  }

  const openModalInsert=()=>{
    setModalInsert(!modalInsert);
  }

  const openModalEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const selectLoad=(load, actioncase)=>{
    setloadselected(load);
    (actioncase=="Edit")&&
    openModalEdit();
  }

  const requestget=async()=>{
    await axios.get(baseurl)
    .then(response =>{
      setData(response.data);
    }).catch(error=>{ console.log(error)})

  }

  const requestPost=async()=>{
    await axios.post(baseurl,loadselected)
    .then(response=>{
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }

  const requestPut=async()=>{
    await axios.put(baseurl, loadselected)
    .then(response=>{
      var resp= response.data;
      var aux=data;
      aux.map(load=>{
        if (load.id===loadselected.id){
          load.vendor_name=resp.vendor_name;
          load.id_load_type= resp.id_load_type;
          load.leg_date= resp.leg_date;
          load.deleted= resp.deleted;
          load.created_by= resp.created_by;
          load.created_at= resp.created_at;
        }
      })
      openModalEdit();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    requestget();
  },[])

  return (
    <div className="App">
      <br/>
      <button onClick={()=> openModalInsert()} className="btn btn-success">Add New Load</button>
      <br/><br/>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
              id
            </th>
            <td>
              vendor_name
            </td>
            <td>
              id_load_type
            </td>
            <td>
              leg_date
            </td>
            <td>
              created_at
            </td>
            <td>
              deleted
            </td>
            <td>
              created_by
            </td>
            <td>
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map(loads=>(
          <tr key={loads.id}>
            <td>{loads.id}</td>
            <td>{loads.vendor_name}</td>
            <td>{loads.id_load_type}</td>
            <td>{loads.leg_date}</td>
            <td>{loads.created_at}</td>
            <td>{loads.deleted}</td>
            <td>{loads.created_by}</td>
            <td>
              <button className="btn btn-primary">Edit</button> {" "}
              <button className="btn btn-danger">Delete</button> {" "}

            </td>
          </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          Add new Load to Database
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Vendor:</label>
            <br/>
            <input type="text" className="form-control" name="vendor_name" onChange={handlechange} />
            <br/>
            <label>Leg Date:</label>
            <br/>
            <input type="date" className="form-control" name="leg_date" onChange={handlechange} />
            <br/>
            <label>Load Type:</label>
            <br/>
            <input type="number" className="form-control" name="id_load_type" onChange={handlechange} />
            <br/>
            <label>Created By:</label>
            <br/>
            <input type="number" className="form-control" name="created_by" onChange={handlechange} />
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=> requestPost()} >Add</button>
          <button className="btn btn-danger" onClick={()=> openModalInsert()} >Cancel</button>
        </ModalFooter>
      </Modal>


      <Modal >
        <ModalHeader>
          Update Load 
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <br/>
            <input type="number" className="form-control" name="id" readOnly="true" onChange={handlechange}  />
            <br/>
            <label>Vendor:</label>
            <br/>
            <input type="text" className="form-control" name="vendor_name" onChange={handlechange} />
            <br/>
            <label>Leg Date:</label>
            <br/>
            <input type="date" className="form-control" name="leg_date" onChange={handlechange}/>
            <br/>
            <label>Load Type:</label>
            <br/>
            <input type="number" className="form-control" name="id_load_type" onChange={handlechange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" >Update</button>
          <button className="btn btn-danger" onClick={()=> openModalEdit()}>Cancel</button>
        </ModalFooter>
      </Modal>      
    </div>
  );
}

export default App;
