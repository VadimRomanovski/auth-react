import React from 'react'

export const TodoItem = ({ todo }) => {
    if (!todo.length) {
      return <p className="center">No Todos</p>
    }
  
    return (
      <table>
  
        <tbody>
        { todo.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.title}</td>
            </tr>
          )
        }) }
        </tbody>
      </table>
    )
  }
