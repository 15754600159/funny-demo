package com.minginglamp.crud;

import com.minginglamp.model.TaskInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by lilongfei on 2017/5/24.
 */
@Mapper
public interface TaskInfoMapper {

    @Select(" select * from task_info where user_id=#{userId} and status=#{status} order by create_time desc ")
    List<TaskInfo> findByUserIdAndStatus(@Param("userId") String userId, @Param("status") int status);

    @Select(" select * from task_info where user_id=#{userId} and status=#{status} and name LIKE CONCAT('%', #{name}, '%') order by create_time desc ")
    List<TaskInfo> findByName(@Param("userId") String userId, @Param("status") int status,@Param("name") String name);
}
