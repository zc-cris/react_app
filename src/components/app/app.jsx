import React, {Component} from 'react'

/*导入我们拆分出来的自定义标签*/
import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'

export default class  App extends Component {

    // 我们之前的写法，用于初始化组件对象的state 属性，实际开发中都是使用下面的写法，更简洁
/*    constructor(props){
        super(props)
        this.state = {
            comments : [
                {username: 'cris', content: 'react 很有意思！'},
                {username: '桥本有菜', content: 'react 有点难啊 - · - ！'},
            ]
        }
    }*/
    // 给组件对象指定state属性
    state = {
        comments : [
            {username: 'cris', content: 'react 很有意思！'},
            {username: '桥本有菜', content: 'react 有点难啊 - · - ！'},
        ]
    }

    /*父组件的添加评论的方法*/
    addComment = (comment) => {
        const {comments} = this.state
        comments.unshift(comment)
        // 一定要更新父组件的state属性，添加comment到comments 数组的行为才可以生效
        this.setState({comments})
    }

    /*父组件删除评论的方法*/
    deleteComment = (index) => {
        const {comments} = this.state
        // slice 方法可以用于数组的新增，删除和修改
        // comments.splice(index, 1, {})     指定index 位置替换一个数据
        // comments.splice(index, 0, {})     指定index 位置添加一个数据
        comments.splice(index, 1)          //指定index 位置删除一个数据
        // 一定要更新父组件的state属性，添加comment到comments 数组的行为才可以生效
        this.setState({comments})
    }

    render () {

        const {comments} = this.state

        return (
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <CommentAdd addComment={this.addComment}/>
                    {/*这里选择将父组件的deleteComment方法通过CommentList 传递给CommentItem */}
                    <CommentList comments = {comments} deleteComment = {this.deleteComment}/>
                </div>
            </div>
        )
    }
}