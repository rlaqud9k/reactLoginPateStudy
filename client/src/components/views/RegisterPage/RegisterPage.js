import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_action/user_action';
import { Link, withRouter } from "react-router-dom";





function RegisterPage(props ) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const onEmailHander = (event)=>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHander = (event)=>{
        setPassword(event.currentTarget.value)
    }

    const onNameHander = (event)=>{
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHander = (event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onsubmitHander = (event)=>{
        event.preventDefault();
    
        if(Password !== ConfirmPassword){
            return alert('비밀번호확인이 일치하지 않습니다.')
        }

        let body = {
            email:Email,
            password: Password,
            name:Name
        }

        dispatch(registerUser(body))
        .then(response=>{
            if(response.payload.success){
                props.history.push('/login')
            }else{
                alert('failed to sign up')
            }
        })

    }

    return (
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <from>
                <form style={{display:'flex', flexDirection:'column'}} 
                    onSubmit={onsubmitHander}>
                    <label>Email</label>
                    <input type="email" value={Email}onChange={onEmailHander} />
                    <label>Name</label>
                    <input type="Name" value={Name} onChange={onNameHander} />
                    <label>Password</label>
                    <input type="Password" value={Password} onChange={onPasswordHander} />
                    <label>ConfirmPassword</label>
                    <input type="ConfirmPassword" value={ConfirmPassword} onChange={onConfirmPasswordHander} />
                    <br/>
                    <button>
                        회원가입
                    </button>
                </form>
            </from>

        </div>
    )
}

export default withRouter(RegisterPage)
