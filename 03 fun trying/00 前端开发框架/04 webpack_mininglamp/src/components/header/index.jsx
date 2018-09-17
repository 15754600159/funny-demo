/*
 * Created by anchao on 2016/6/29.
 */
import { React, PropTypes, NavLink, withRouter } from 'framework/Util'
import config from 'conf'
import dialog from 'dialog'
import './scss/index.scss'

const Header = function ({ username, timestamp, logout, history }) {
    const logoutFn = () => {
        logout()
            .then((res) => {
                if (res.statusCode === 200) {
                    history.replace(config.url.login.path)
                } else {
                    dialog.alert({
                        infoType: 'error',
                        content: <div>{res.message}</div>
                    })
                }
            })
    }

    return (
        <div id="header" className="clearfix">
            <div className="pull-left" id="logo" />
            <div className="pull-left navigation">
                <ul className="list-unstyled list-inline">
                    <li>
                        <NavLink
                            replace
                            to={config.url.login.path}
                            activeClassName="active"
                        >登录
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.todos.path}
                            activeClassName="active"
                        >todos示例
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            replace
                            to={config.url.app.others.path}
                            activeClassName="active"
                        >其它
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="pull-right headrright">
                <div>{timestamp.length > 0 ? `${username}-${timestamp}` : username}</div>
                <div role="presentation" onClick={logoutFn}><i className="fa fa-power-off" /></div>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default withRouter(Header)
