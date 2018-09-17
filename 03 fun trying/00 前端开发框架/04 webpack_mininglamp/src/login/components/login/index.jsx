/**
 * 功能：登录组件
 * 作者：安超
 * 日期：2018/7/4
 */

import config from 'conf'
import { React, PropTypes } from 'framework/Util'
import classNames from 'classnames'
import ReactComponentBase from 'base/ReactComponentBase'
import particlesJS from 'particles'
import * as actionTypes from '../../actions/actionTypes'
import './scss/index.scss'

const { constant } = config

class Login extends ReactComponentBase {
    constructor(props){
        super(props)

        this.state = {
            errorMsg: '',
            userType: actionTypes.USER_TYPE[0]
        }
    }

    componentDidMount() {
        // 用户名获得焦点11
        this.username.focus()
        particlesJS('particles-js', constant.particles)
    }
    
    checkedChange = (userType) => {
        this.setState({ userType })
    }

    setError = (errorMsg) => {
        this.setState({ errorMsg })
    }

    login = () => {
        const username = this.username.value.trim()
        const pwd = this.pwd.value.trim()
        const type = this.state.userType
        
        if (username.length === 0) {
            this.username.focus()
            this.setError('请输入用户名!')
            return
        }
        
        if (pwd.length === 0) {
            this.pwd.focus()
            this.setError('请输入密码!')
            return
        }
        
        // 清空错误信息
        this.setError('')
        
        // 登录检验
        this.props.login({ data: { username, pwd, type } })
            .then((res) => {
                if (res.statusCode === 200) {
                    this.gotoUrl(config.url.app.root.path)
                } else {
                    this.setError(res.message)
                }
            })
    }
    
    gotoUrl = (url) => {
        this.props.history.replace(url)
    }
    
    render() {
        const { userType, errorMsg } = this.state
        const errorCls = classNames('errors', 'pull-right', { invisible: errorMsg.length <= 0 })
        
        return (
            <div id="chief">
                <div className="login-login">
                    <div id="particles-js" />
                    <div className="loginmain">
                        <div className="input-group">
                            <input
                                type="text"
                                ref={(username) => {
                                    this.username = username
                                }}
                                className="login-user"
                                onKeyDown={this.forbitBlackSpace}
                            />
                            <input
                                type="password"
                                ref={(pwd) => {
                                    this.pwd = pwd
                                }}
                                className="login-pwd"
                            />
                            <i className="fa fa-user-o fa-lg" />
                            <i className="fa fa-bell-o fa-lg pwdico" />
                        </div>
                        <div className="login-btn">
                            <div className={errorCls}><i
                                className="fa fa-exclamation-circle fa-lg"
                            />{errorMsg}
                            </div>
                            <div className="clearfix" />
                            <button type="button" className="login_button pull-right" onClick={this.login}>
                                登录
                            </button>
                            <div className="clearfix" />
                            <div className="rolerow">
                                <div className="pull-left">
                                    <div className="pull-left role"><span
                                        role="presentation"
                                        value="0"
                                        onClick={() => this.checkedChange('0')}
                                        className={classNames({ checked: userType === '0' })}
                                    />用户
                                    </div>
                                    <div className="pull-left role"><span
                                        role="presentation"
                                        value="1"
                                        onClick={() => this.checkedChange('1')}
                                        className={classNames({ checked: userType === '1' })}
                                    />管理员
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
}

export default Login
