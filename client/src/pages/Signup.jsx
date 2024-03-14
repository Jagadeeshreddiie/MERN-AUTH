// eslint-disable-next-line no-unused-vars
import React,{useState} from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  const [userdata,setUserdata]=useState({});
  const [err,setErr]=useState(false);
  const [loading,setLoading]=useState(false);

  // handling change of form data

  const handleChange=(e)=>{
    setUserdata({...userdata,[e.target.id]:e.target.value})
  }
  
  // handling submitting form
  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(userdata);
    try{
      setLoading(true);
      const res=await fetch("http://localhost:3000/api/auth/signup                                                                                                    ",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userdata)
      })
      const data=await res.json();
      console.log(data);
      setErr(false);
      if(data.success===false){
        setErr(true);
        setLoading(false);
      }
      setLoading(false);
    }
    catch(error){
      setLoading(false);
      setErr(true);
    }
    setUserdata({
      username:'',
      email:'',
      password:''
    });
  }
  return (
    <React.Fragment>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center font-bold text-3xl my-7">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={userdata.username}
            className="bg-slate-100 p-3 rounded-lg mt-3"
            placeholder="Username"
            id="username"
            type="text"
          />
          <input
          onChange={handleChange}
            value={userdata.email}
            className="bg-slate-100 p-3 rounded-lg mt-3"
            placeholder="Email"
            id="email"
            type="email"
          />
          <input
          onChange={handleChange}
            value={userdata.password}
            className="bg-slate-100 p-3 rounded-lg mt-3"
            placeholder="Password"
            id="password"
            type="password"
          />
          <button type="submit" className="bg-slate-800 text-white rounded-lg p-3 hover:opacity-85">
          {loading ? "Loading..." : "Register"}
          </button>
          <button className="bg-red-800 text-white rounded-lg p-3 hover:opacity-85">
            Google  
          </button>
        </form>
        <div className="flex gap-3 mt-2">
          <p>Already have an account ?</p>
          <Link to="/signin">
            <span style={{ color: "Blue" }} className="font-semibold">
              Sign in
            </span>
          </Link>
        </div>
        {err && <p className="text-red-700 mt-5 font-semibold">Something went Wrong! </p>}  
      </div>
    </React.Fragment>
  );
}
