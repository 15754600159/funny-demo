package com.minginglamp.crud;

import com.minginglamp.model.RelationDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by lilongfei on 2017/5/20.
 */
public interface RelationDetailCrud extends JpaRepository<RelationDetail,Integer> {

    List<RelationDetail> findByJobIdAndRelationCardMd5(int jobId,String relationCard);

    List<RelationDetail> findByJobId(int jobId);
}
