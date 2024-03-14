// eslint-disable-next-line no-unused-vars
import React,{useState} from "react";
import { Link } from "react-router-dom";
 function Signin() {
  const [user,setUser]=useState({});
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(false);
  const handleChange=(e)=>{
    setUser({...user,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res=await fetch("http://localhost:3000/api/auth/signin",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
      })
      const data=await res.json();
      console.log(data);
      // if(data.message){
      //   setErr(true);
      // }
      setLoading(false);
    }
    catch(error){
      setLoading(false);
      setErr(true);
    }
    setUser({
      email:'',
      password:''
    });
  }
  return (
    <React.Fragment>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center font-bold text-3xl my-7">Sign in</h1>
        <form className="flex flex-col gap-4">
          <input
            className="bg-slate-100 p-3 rounded-lg mt-3"
            placeholder="Email"
            id="email"
            type="email"
            onChange={handleChange}
            value={user.email}
          />
          <input
            className="bg-slate-100 p-3 rounded-lg mt-3"
            placeholder="Password"
            id="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          />
          <button onClick={handleSubmit} className="bg-slate-800 text-white rounded-lg p-3 hover:opacity-85">
            {loading ? ' Loading...':'Login'}
          </button>
          <button className="bg-red-800 text-white rounded-lg p-3 hover:opacity-85">
            Google  
          </button>
        </form>
        <div className="flex gap-3 mt-2">
          <p>Don&apos;t have an account ?</p>
          <Link to="/signup">
            <span style={{ color: "Blue" }} className="font-semibold">
              Create Account
            </span>
          </Link>
        </div>
        {err && <p className="text-red-500">Something Went Wrong</p>}
      </div>
    </React.Fragment>
  );
}
export default Signin;