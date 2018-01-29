package com.minginglamp.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Data
@ToString
@Entity
@Table(name = "task_data")
public class TaskData implements java.io.Serializable {

    private static final long serialVersionUID = -3641426206379490180L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    private String idCard;

    private String seq;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
}
