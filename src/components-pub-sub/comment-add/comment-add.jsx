import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CommentAdd extends Component {

    static propTypes = {
        addComment: PropTypes.func.isRequired
    }

    /*这样初始化state属性而不是使用constructor构造函数，更加简洁*/
    state = {
        username: '',
        content: ''
    }

    /*使用箭头函数的形式生成提交用户评论的函数，因为箭头函数默认this指向的是当前对象*/
    handleSubmit = () => {

        // 收集用户名和用户评论（推荐使用受控组件的方式：即使用对象的state属性来初始化，封装数据，而且很方便的就可以清除用户输入的数据）
        // 封装成comment 对象(必须要注意comment对象的属性和state的属性名必须一致)
        const comment = this.state

        // 提交用户名和评论（实际上是调用父组件的添加方法，因为数组是在父组件中）
        this.props.addComment(comment)

        //清除输入的数据
        this.setState({
            username: '',
            content: ''
        })

    }

    handleUsernameChange = (event) => {
        /*拿到输入框的用户名，然后设置到state属性中去*/
        const username = event.target.value
        this.setState({username})
    }

    handleContentChange = (event) => {
        const content = event.target.value
        this.setState({content})
    }

    render() {
        /*先获取到state属性中的key对应的value*/
        const {username, content} = this.state

        return (
            <div className="col-md-4">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" className="form-control" placeholder="用户名" value={username}
                               onChange={this.handleUsernameChange}/>
                    </div>
                    <div className="form-group">
                        <label>评论内容</label>
                        <textarea className="form-control" rows="6" placeholder="评论内容" value={content}
                                  onChange={this.handleContentChange}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right"
                                    onClick={this.handleSubmit}>提交
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}