import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hook/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Todos} from '../components/Todos'

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const [todo, setTodo] = useState('')
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
        try {
            const data = await request('/api/todo/generate', 'POST', {title: todo}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
        } catch (e) {}
        }
    }

    return(
    <div className="conatiner">
        <div className="row">
            <form class="col s12">
                <div className="row">
                    <div className="input-field col s10">
                        <input
                            placeholder="Enter your task"
                            id="link"
                            type="text"
                            value={todo}
                            onChange={e => setTodo(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>
                    <button class="btn waves-effect waves-light" style={{marginTop:"25px"}} type="submit" name="action">Submit</button>
                </div>
            </form>
        </div>
        <Todos />
    </div>
    )
}