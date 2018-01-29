package com.minginglamp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Data
@ToString
@Entity
@Table(name = "task_info")
public class TaskInfo implements java.io.Serializable{

    private static final long serialVersionUID = -8305384335499291806L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "user_id",nullable = false)
    private String userId;

    @Column(name = "user_name",nullable = false)
    private String userName;

    @Column(name = "up_count",nullable = false)
    private int upCount;

    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    @Column(name = "create_time",nullable = false)
    private Date createTime;

    @Column(name = "status",nullable = false)
    private int status;

    @Column(name = "seq",nullable = false)
    private String seq;

    @Column(name = "finish",nullable = false)
    private int finish;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getUpCount() {
		return upCount;
	}

	public void setUpCount(int upCount) {
		this.upCount = upCount;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public int getFinish() {
		return finish;
	}

	public void setFinish(int finish) {
		this.finish = finish;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
    
}
