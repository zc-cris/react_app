import React, {Component} from 'react'
import PropTypes from 'prop-types' // 如果要对外界传来的数据做出显示，需要导入这个规则包
// 引入显示列表每个item的组件
import CommentItem from '../comment-item/comment-item'
import './commentList.css'
/*导入css样式*/

export default class CommentList extends Component {

    /*给组件类添加props属性验证规则*/
    static propTypes = {
        comments: PropTypes.array.isRequired,
    }

    render() {

        const {comments} = this.props
        // 定义一个常量，计算评论列表是否需要显示暂无评论的文本（）
        /* == 和 != 比较若类型不同，先偿试转换类型，再作值比较，最后返回值比较结果 。而 === 和 !== 只有在相同类型下,才会比较其值，建议使用 === */
        const display = comments.length === 0 ? 'block' : 'none'

        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                {/*这里style的属性使用结构赋值的es6 语法*/}
                <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        /*这里将父组件的deleteComment 方法传递给 CommentItem 子组件，CommentList 充当了中间桥梁的作用，还需要传递index（数组索引给 CommentItem ）*/
                        comments.map((comment, index) => <CommentItem comment={comment} key={index} index={index}/>)
                    }
                </ul>
            </div>
        )
    }
}

