package com.minginglamp.model;

import lombok.Data;
import lombok.ToString;

/**
 * Created by lilongfei on 2017/5/25.
 */
@Data
@ToString
public class TagParse implements java.io.Serializable{

    private static final long serialVersionUID = 3565691282014839242L;
    private String tag;

    private String tagDetail;
    public  void setTag(String tag){
        this.tag = tag;
    }
    public  void setTagDetail(String tagDetail){
        this.tagDetail = tagDetail;
    }
    public String getTag(){
        return this.tag;
    }
    public String getTagDetail(){
        return this.tagDetail;
    }
}
