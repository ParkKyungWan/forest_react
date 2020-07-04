import React, { Component } from 'react'

export default class PostView extends Component {
    
    render() {
        const { title, content, key } = this.props
        return (
            <div>
                
                <h3>{title}</h3>
                <p>{content}</p>
                <p>{key}</p>
                

            </div> 
        )
    }
}
