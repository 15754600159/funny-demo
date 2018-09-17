/**
 * Created by anchao on 2016/7/26.
 */
import { React } from 'framework/Util'
import Header from '../header'

function Error() {
    return (
        <div id="chief">
            <Header />
            <div className="main404">
                <h1>not found</h1>
                <h2>does not exist. time to go outside.</h2>
                <div><a href="#/">返回</a></div>
            </div>
        </div>
    )
}

export default Error
