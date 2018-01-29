package com.minginglamp.reflect;

import java.lang.reflect.Field;  
import java.lang.reflect.InvocationTargetException;  
import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.util.HashMap;

import org.springframework.jdbc.core.RowMapper;

  
@SuppressWarnings("unchecked")  
public class MyMapper implements RowMapper{  
	

	
	
    String classPath;  
    String[] fields;  
      
    /** 
     * 初实话类路径 
     * 初始化属性数组 
     * @param classPath_ 
     * @param fields 
     */  
    public  MyMapper(String classPath_,String[]  fields){  
        this.classPath = classPath_;  
        this.fields = fields;  
    }  
  
    /** 
     * 获取类所有属性及其类型 
     */  
     public  HashMap<String,Class<?>> init(){  
          try {  
                HashMap<String,Class<?>> fieldHashMap=new HashMap<String,Class<?>>();  
                Class<?> cls = Class.forName(classPath);   
                Field[] fieldlist = cls.getDeclaredFields();  
                for (int i = 0; i < fieldlist.length; i++) {  
                    Field fld = fieldlist[i];  
                    fieldHashMap.put(fld.getName(), fld.getType());  
                    }  
                return fieldHashMap;  
            } catch (ClassNotFoundException e) {  
                e.printStackTrace();  
            }  
            return null;  
     }  
       
     /** 
      * 拼装get方法 
      * @return 
      */  
     @SuppressWarnings("unused")  
    private String getGetMethod(String fieldName){  
         String field = "get";  
         field = field+toUpperCaseFirstOne(fieldName);  
         return field;  
     }  
     /** 
      * 拼装set方法 
      * @return 
      */  
     private String getSetMethod(String fieldName){  
         String field = "set";  
         field = field+toUpperCaseFirstOne(fieldName);  
         return field;  
     }  
       
     /** 
      * 首字母转化小写 
      * @param s 
      * @return 
      */  
    @SuppressWarnings("unused")  
    private static String toLowerCaseFirstOne(String s) {  
        if (Character.isLowerCase(s.charAt(0))) {  
            return s;  
        } else {  
            return (new StringBuilder()).append(  
                    Character.toLowerCase(s.charAt(0))).append(s.substring(1))  
                    .toString();  
        }  
    }  
  
      
    /** 
     * 首字母转化为大写 
     * @param s 
     * @return 
     */  
    private static String toUpperCaseFirstOne(String s) {  
        if (Character.isUpperCase(s.charAt(0))) {  
            return s;  
        } else {  
            return (new StringBuilder()).append(  
                    Character.toUpperCase(s.charAt(0))).append(s.substring(1))  
                    .toString();  
        }  
    }  
  
    @Override  
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {  
        Class<?> cls = null;  
        Object obj_ = null;  
        try {  
            cls = Class.forName(classPath);  
            obj_ = cls.newInstance();  
            HashMap<String, Class<?>> map = this.init();  
            for (int i = 0; i < fields.length; i++) {  
                String methodName = this.getSetMethod(fields[i]);  
                Object obj = rs.getObject(fields[i]);  
                cls.getDeclaredMethod(methodName, map.get(fields[i])).invoke(obj_,obj);  
            }  
        } catch (ClassNotFoundException e) {  
            e.printStackTrace();  
        } catch (IllegalArgumentException e) {  
            e.printStackTrace();  
        } catch (SecurityException e) {  
            e.printStackTrace();  
        } catch (IllegalAccessException e) {  
            e.printStackTrace();  
        } catch (InvocationTargetException e) {  
            e.printStackTrace();  
        } catch (NoSuchMethodException e) {  
            e.printStackTrace();  
        } catch (InstantiationException e) {  
            e.printStackTrace();  
        }  
        return obj_;  
    }  
    
    
    

}  