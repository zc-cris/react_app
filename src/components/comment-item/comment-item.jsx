import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './commentItem.css'

export default class CommentItem extends Component {

    /*传入的必须是一个js对象，用于显示每条评论*/
    static propTypes = {
        comment: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        deleteComment: PropTypes.func.isRequired
    }

    /*用户点击删除按钮事件*/
    handleClick = () => {
        const {index, deleteComment, comment} = this.props
        /*这里使用变量输出语法，记得使用 `xxx` 符号而不是 'xxx'*/
        if (window.confirm(`确认要删除${comment.username}的评论吗？`)) {
            // 用户确认后删除用户评论数据
            deleteComment(index)
        }
    }

    render () {

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