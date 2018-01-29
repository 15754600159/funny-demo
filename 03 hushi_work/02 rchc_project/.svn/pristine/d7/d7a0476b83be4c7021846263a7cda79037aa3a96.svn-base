package com.minginglamp.crud;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.minginglamp.model.PersonCheck;

@Mapper
public interface PersonCheckMapper {

	
	  @Select(" select * from jwt_check_person_log_1501 where 1=#{sql}")
	    List<PersonCheck> findPersonCheck(@Param("sql") String sql);
	  
	//  List<PersonCheck> findPage1(PageBounds pageBounds, Map<String,String[]> data);
}
