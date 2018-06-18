import React, {Component} from 'react'
import PubSub from 'pubsub-js' // 引入pubsub-js 这个发布订阅包

export default class Search extends Component {


    state = {
        input: ''
    }

    handleClick = () => {
        // 获取用户输入的搜索数据（非受控组件的形式）
        const searchName = this.input.value.trim()
        // const searchName = this.state.input          // 受控组件的形式

        if (searchName) {
            // 需要发布消息（消息名和消息参数）
            PubSub.publish('search_user_name', searchName)
        } else {
            alert("请输入搜索的用户名")
        }
    }

    // 如果使用受控组件就稍微麻烦一些
    handleChange = (event) => {
        const input = event.target.value.trim()
        this.setState({input})
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    {/*这里使用非受控组件进行数据的获取*/}
                    <input type="text" placeholder="enter the name you search" ref={input => this.input = input}/>

                    {/*如果使用非受控组件就比较好清除输入框的内容，但是要麻烦一些（虽然官方推荐）*/}
                    {/*<input type="text" placeholder="enter the name you search" value={this.state.input} onChange={this.handleChange}/>*/}

                    <button onClick={this.handleClick}>Search</button>
                </div>
            </section>
        )
    }
}