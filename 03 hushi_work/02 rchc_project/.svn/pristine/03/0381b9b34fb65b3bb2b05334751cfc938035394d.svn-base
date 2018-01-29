package com.minginglamp.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.utils.JsonUtils;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.java.Log;

import javax.persistence.*;

/**
 * Created by lilongfei on 2017/5/20.
 */
@ToString
@Entity
@Log
@Table(name = "task_detail")
public class TaskDetail implements java.io.Serializable {

    private static final long serialVersionUID = 5983197450222793299L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int id;

    @Column(name = "job_id",nullable = false)
    public int jobId;

    @Column(name = "name")
    public String name;

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

    @Column(name = "sex")
    private String sex;

    @Column(name = "id_card_md5")
    private String idCardMd5;

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getIdCardMd5() {
        return idCardMd5;
    }

    public void setIdCardMd5(String idCardMd5) {
        this.idCardMd5 = idCardMd5;
    }

    public String getSource() {
        //log.info(tagDetail);
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"source");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getInfo() {
       // log.info(tagDetail);
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"info");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getFields() {
      //  log.info(tagDetail);
        JsonNode jsonNode = JsonUtils.getjsonvalue(this.tagDetail,"fields");
        return jsonNode == null ? "" : jsonNode.asText();
    }

    public void setFields(String fields) {
        this.fields = fields;
    }
}
