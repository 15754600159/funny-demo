package com.minginglamp.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.utils.JsonUtils;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Entity
@Table(name = "relation_detail")
@ToString
public class RelationDetail{

    private static final long serialVersionUID = 1205825873456170014L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int id;

    @Column(name = "job_id",nullable = false)
    public int jobId;

    @Column(name = "name",nullable = false)
    public String name="";

    @Column(name = "id_card",nullable = false)
    public String idCard;

    @Column(name = "nation")
    public String nation;

    @Column(name = "tag",nullable = false)
    public String tag;

    @Column(name = "birthday")
    public String birthday;

    @Column(name = "birthplace")
    public String birthplace;

    @Column(name = "tag_detail")
    public String tagDetail;

    @Column(name = "relation_card_md5",nullable = false)
    private String relationCardMd5;

    @Column(name = "relation_card",nullable = false)
    private String relationCard;

    @Column(name = "relation_name",nullable = false)
    private String relationName;

    @Column(name = "sex")
    private String sex;

    @Transient
    private String source;

    @Transient
    private String info;

    @Transient
    private String fields;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public String getTagDetail() {
        return tagDetail;
    }

    public void setTagDetail(String tagDetail) {
        this.tagDetail = tagDetail;
    }

    public String getRelationCardMd5() {
        return relationCardMd5;
    }

    public void setRelationCardMd5(String relationCardMd5) {
        this.relationCardMd5 = relationCardMd5;
    }

    public String getRelationCard() {
        return relationCard;
    }

    public void setRelationCard(String relationCard) {
        this.relationCard = relationCard;
    }

    public String getRelationName() {
        return relationName;
    }

    public void setRelationName(String relationName) {
        this.relationName = relationName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSource() {
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"source");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getInfo() {
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"info");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getFields() {
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"fields");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setFields(String fields) {
        this.fields = fields;
    }


    @Override
    public int hashCode() {
        return this.getTag().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof RelationDetail) {
            RelationDetail taskDetail = (RelationDetail)obj;
            if(tag.equals(taskDetail.getTag())){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}
