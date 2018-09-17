/**
 * Created by anchao on 2016/6/29.
 */
import { connect } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import AddTodo from '../../components/addTodo'

export default connect(() => ({}), actionCreator)(AddTodo)
