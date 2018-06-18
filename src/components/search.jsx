import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {

    static propTypes = {
        setSearchName: PropTypes.func.isRequired
    }

    state = {
        input: ''
    }

    handleClick = () => {
        // 获取用户输入的搜索数据（非受控组件的形式）
        const searchName = this.input.value.trim()
        // const searchName = this.state.input          // 受控组件的形式

        if (searchName) {
            // 调用父组件的搜索数据设置方法
            this.props.setSearchName(searchName)
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