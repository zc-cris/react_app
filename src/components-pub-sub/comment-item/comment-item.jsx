import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

import './commentItem.css'

export default class CommentItem extends Component {

    /*传入的必须是一个js对象，用于显示每条评论*/
    static propTypes = {
        comment: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
    }

    /*用户点击删除按钮事件*/
    handleClick = () => {
        const {index, comment} = this.props
        /*这里使用变量输出语法，记得使用 `xxx` 符号而不是 'xxx'*/
        if (window.confirm(`确认要删除${comment.username}的评论吗？`)) {
            /*用户确定删除那么就需要发布删除事件给App父组件*/
            // 这里的两个参数：发布事件名，父组件删除item函数需要的index索引
            PubSub.publish('delete_comment', index)
        }
    }

    render() {

        const {comment} = this.props

        return (
            <li className="list-group-item">
                <div className="handle">
                    <a href="javascript:;" onClick={this.handleClick}>删除</a>
                </div>
                <p className="user"><span>{comment.username}</span><span>说:</span></p>
                <p className="centence">{comment.content}</p>
            </li>
        )
    }
}