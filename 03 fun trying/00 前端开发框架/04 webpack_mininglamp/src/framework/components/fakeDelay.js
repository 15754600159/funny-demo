/**
 * 功能：模拟延时加载
 * 作者：安超
 * 日期： 2018/5/3
 */

export default function fakeDelay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
