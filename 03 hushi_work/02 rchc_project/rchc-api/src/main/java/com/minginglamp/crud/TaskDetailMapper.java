package com.minginglamp.crud;

import com.minginglamp.model.TaskDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Mapper
public interface TaskDetailMapper {

    @Select(" select group_concat(tag) as tag,id_card,name,nation,birthday,sex,birthplace from task_detail where job_id = #{jobId} group by id_card,name,nation,birthday,sex,birthplace ")
    List<TaskDetail> findTaskDetail(int jobId);

    @Select({"<script> ",
            " select group_concat(tag) as tag,id_card,name,nation,birthday,sex,birthplace from task_detail where job_id = #{jobId} and tag in ",
            "<foreach item='item' index='index' collection='tags'",
            "open='(' separator=',' close=')'>",
            "#{item}",
            "</foreach>",
            " group by id_card,name,nation,birthday,sex,birthplace ",
            " </script>"})
    List<TaskDetail> findTaskByTagAndJobId(Map<String,Object> map);


    @Select(" select tag,id_card,name,nation,birthday,sex,birthplace from task_detail where job_id = #{jobId} and id_card=#{card} group by tag,id_card,name,nation,birthday,sex,birthplace ")
    List<TaskDetail> findTaskByCard(@Param("jobId") int jobId,@Param("card") String idCard);
    
  
}
