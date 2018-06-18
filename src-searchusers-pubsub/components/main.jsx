import React, {Component} from 'react'
import axios from 'axios' // 导入axios 包
import PubSub from 'pubsub-js'

export default class Main extends Component {


    state = {
        initView: true,             // 初始化状态
        loading: false,             // 发送请求的loading状态
        users: null,                // 获取到用户数据的状态，即成功状态
        errorMsg: null              // 获取用户数据失败的状态
    }

    /*注意：订阅事件需要在组件初始化完成后即绑定*/
    componentDidMount() {

        /*强烈建议回调函数都用箭头的形式*/
        PubSub.subscribe('search_user_name', (msg, searchName) => {
            // 更新状态为请求中
            this.setState({
                initView: false,            // 必须先设置初始化状态为false
                loading: true
            })

            //发送ajax 请求
            const url = `https://api.github.com/search/users?q=${searchName}`       // 使用命名参数语法需要`xxx${yyy}`， 不要使用'xxx'x或者 "xxx"
            axios.get(url)
                .then(response => {
                    // 得到响应数据
                    const result = response.data
                    // 这里非常类似java 8 中的Steam API，都是将一个数组的数据转换为另一种格式数据的数组
                    const users = result.items.map(item => ({
                        name: item.login,
                        url: item.html_url,
                        avatarUrl: item.avatar_url
                    }))
                    // 将状态改为成功（即获取到远程服务器的数据）
                    this.setState({loading: false, users})
                })
                .catch(error => {
                    // 将状态改为失败
                    this.setState({loading: false, errorMsg: error.message})
                })
        })
    }

    /*需要根据状态来进行组件的渲染*/
    render() {
        console.log(this.props.searchName)
        const {initView, loading, users, errorMsg} = this.state
        if (initView) {
            return <h2>请输入用户名进行检索</h2>
        } else if (loading) {
            return <h2>正在检索中...请稍后</h2>
        } else if (errorMsg) {
            return <h2>{errorMsg}</h2>
        } else {
            return (
                <div className="row">
                    {
                        users.map((user, index) => ( // 箭头函数不仅可以绑定this 到当前对象，还可以省略 return 关键字：需要函数体在（）中

                            <div className="card" key={index}>
                                <a href={user.url} target="_blank">
                                    <img src={user.avatarUrl} style={{width: 100}}/>
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>

                        ))
                    }
                </div>
            )
        }
    }
}