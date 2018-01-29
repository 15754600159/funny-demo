package com.minginglamp.common;

public class SqlFactoryReflection {

	/** 
     * @author fule 
     * @param args 
     * 反射工具类 自动生成sql 语句 和参数赋值 实体类中含有id字样的只能唯一 
     * 对外接口 对象 语句类型 查询参数Map<String,object>字段名 字段值 
     *             
     * 如果是查询操作，构造方法传入一个jvm初始化的对象实体，生成语句时调用createQuerySql(map ma)方法  
     * Map<String,object>字段名 字段值 
     *             
     * 其他操作,构造方法传入一个具体对象实体，生成语句时调用createUpdateSql(String type)方法 
     * type为update delete insert 的字符串 
     */
	//需自动化的对象
	private Object obj;
	
	
	//生成的sql语句
	private String sql;
}
