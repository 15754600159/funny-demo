package com.minginglamp.utils;

import lombok.Data;
import lombok.ToString;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Data
@ToString
//@ApiModel
public class ResultMsg implements java.io.Serializable{

    public ResultMsg(int success, Object msg) {
        this.success = success;
        this.msg = msg;
    }

//    @ApiModelProperty(allowableValues = "0,1",dataType = "number",name = "成功或者失败",value = "0:失败,1:成功")
    private int success;

//    @ApiModelProperty(name = "返回具体值")
    private Object msg;

    public static ResultMsg success(Object msg){
        return new ResultMsg(1,msg);
    }

    public static ResultMsg error(Object msg){
        return new ResultMsg(0,msg);
    }
}
