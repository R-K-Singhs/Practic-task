import React ,{useState,useEffect} from 'react'
import axios from "axios"



export default function AddUser() {

    const [state, setstate] = useState({
        username:"",
        password:"",
        business_id:""
    })

    const [businesses, setBusinesses] = useState([])
    const [users, setUsers] = useState([])

    const inputControl=(event)=>{
        const {name,value}=event.target;

        console.log(name,value);
        setstate((preval)=>{
            return({...preval,[name]:value})
        })

    }
    

    useEffect( async () => {
        console.log("effect");
         try{
            const result =await axios.get("http://localhost:5000/businesses");
            console.log("businesses",result.data);
            setBusinesses(result.data)
         }catch(err){
             console.log(err);
             console.log("data not found");
         }
    },[])

    const SubmitHandler=async ()=>{

        if(state.username&&state.password&&state.business_id){
        try{
            const result =await axios.post("http://localhost:5000/adduser",state);
            alert("user added successfuly")
         }catch(err){
             console.log(err);
         }
        }else{
            alert("all fieldes are required")
        }
        console.log("Submitted data ",state);
    }

    const showUsers= async ()=>{
        console.log("effect");
        try{
           const result =await axios.get("http://localhost:5000/user/getlist");
           console.log("users",result.data);
           setUsers(result.data);
        }catch(err){
            console.log(err);
            console.log("data not found");
        }
    }




    return (
             <>
             <div className="d-flex">
             <div className="card me-4">
              <h5 className="card-header text-dark">All Users</h5>
              <div className="card-body">
              <table class="table">
                <thead>
                    <tr>
                    <th scope="col ">username</th>
                    <th scope="col">password</th>
                    <th scope="col">Business Name</th>
                    </tr>
                </thead>
                <tbody>
                    
                {users.map((record,index)=>{
                                   
                             return( <tr>
                                    <td>{record.username}</td>
                                    <td>{record.password}</td>                                  
                                </tr>)
                            })}
                
                </tbody>
                </table>           
            <button className="btn btn-primary mt-2" onClick={showUsers}> submit</button>          
             </div>
            </div>
             <div className="card">
              <h5 className="card-header text-dark">Add User</h5>
              <div className="card-body">
              <select className="form-select"  name="business_id" onChange={inputControl}>
                <option disabled>Open this select menu</option>
                {businesses.map((record,index)=>{
                    return( <option value={record.business_id} key={index}>{record.name}</option>)
                })}
            
                </select>
                <input type="text" className="form-control mt-2" placeholder="First name" name="username" onChange={inputControl}/>
                <input type="text" className="form-control mt-2" placeholder="First name"  name="password" onChange={inputControl}/>
            
            <button className="btn btn-primary mt-2" onClick={SubmitHandler}> submit</button>
           
             </div>
            </div>
            
            </div>
             </>

    )
}
