import React, {Component} from 'react'

import Search from './search'
import Main from './main'

export default class App extends Component {

    state = {
        searchName: ''
    }

    /*父组件的state 属性对象作为中间参数，获取Search 组件用户输入的数据然后传递到Main 组件中去*/
    setSearchName = (searchName) => {
        this.setState({searchName})
    }

    render() {
        return (
            <div className="container">
                <Search setSearchName={this.setSearchName}/> {/*将父组件的函数设置给子组件用于更新父组件的state 属性的searchName 值*/}
                <Main searchName={this.state.searchName}/>
            </div>
        )
    }
}