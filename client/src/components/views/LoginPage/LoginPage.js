import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Axios from 'axios'
import {loginUser} from '../../../_action/user_action';
import {withRouter } from "react-router-dom";



function LoginPage(props){

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHander = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHander = (event)=>{
        setPassword(event.currentTarget.value)
    }

    const onsubmitHander = (event)=>{
        event.preventDefault();
        let body = {
            email:Email,
            Password: Password
        }
        console.log("df",body.email,body.Password)

        dispatch(loginUser(body))
        .then(response=>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            }else{
                console.log(response.message)
            }
        })
    }
    return(
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <from>
                <form style={{display:'flex', flexDirection:'column'}} 
                    onSubmit={onsubmitHander}>
                    <label>Email</label>
                    <input type="email" value={Email}onChange={onEmailHander} />
                    <label>Password</label>
                    <input type="Password" value={Password} onChange={onPasswordHander} />
                    <br/>
                    <button>
                        Login
                    </button>
                </form>
            </from>

        </div>

    )
}
export default withRouter(LoginPage)