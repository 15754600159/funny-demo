/**
 * 功能：地图测试
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import { ReactComponent, DrawingManager, DrawingMode, Map, Navigation, Marker, Control } from 'rc-bmap'
import './scss/index.scss'

@ReactComponent
class CustomControl extends Control{
    mapClick = () => {
        debugger
        console.log(this.props.instance)
    }
    
    render(){
        return (
            <div className="customcontrol-map" role="presentation" onClick={this.mapClick}>
                <i className="fa fa-google" />
                <i className="fa fa-twitter" />
                <i className="fa fa-facebook" />
            </div>
        )
    }
}

class MapSimple extends ReactComponentBase{
    constructor(props){
        super(props)
        
        this.instance = null
    }
    
    handleMapMounted = (map) => {
        console.log(map)
        // map.enableScrollWheelZoom(true)
        // const point = new window.BMap.Point(116.404, 39.915)
        // map.centerAndZoom(point, 15)
    
    
        // map.addControl(new window.BMap.NavigationControl())
        // map.setCurrentCity("北京")
    }
    
    getInst = (instance) => {
        instance.open()
        
        setTimeout(() => {
            instance.setDrawingMode(DrawingMode.CIRCLE)
        }, 3000)
    }
    
    render(){
        // 天安门
        const makerPoint = {
            lng: 116.404,
            lat: 39.915
        }
    
        const centerPoint = { lng: 116.372074, lat: 39.967488 }
    
        const events = {
            circlecomplete(e, overlay) {
                console.log(overlay)
            }
        }
    
        const offset = {
            width: 10,
            height: 10
        }
    
        const drawingModes = [
            DrawingMode.MARKER,
            DrawingMode.CIRCLE,
        ]
    
        return (
            <Map
                ak="nvwlnIROmNKspQWn4IaR0g1OebViUF43"
                center={centerPoint}
                zoom={15}
                mapMounted={this.handleMapMounted}
            >
                <Navigation />
                <Marker point={makerPoint} />
                <CustomControl instance={this.instance} />
                <DrawingManager
                    getInstance={this.getInst}
                    enableDrawingTool={false}
                    events={events}
                    offset={offset}
                    drawingModes={drawingModes}
                />
            </Map>
        )
    }
}

export default MapSimple
