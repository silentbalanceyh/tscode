# Application

## Table

* `VIE_APP`
* `VIE_APP_CONFIG`

## Comments

* **URI**: /api/config/${name}
* **Method**: GET
* **Secure**: No
* **Parameters**: URI
	* name: 应用程序在Database中存储的应用名称
* **Desc**: 该接口用于读取应用程序配置信息

## Response

Address: /api/config/vie.app.console

	{
	  "data": {
	    "owner": "Lang Yu",
	    "backup": "console/bak",
	    "dateFormat": "yyyy-MM-dd HH:mm",
	    "auth": "BASIC",
	    "encoding": "UTF-8",
	    "title": "Engine Console",
	    "version": "0.9.1",
	    "attachSize": "4096",
	    "emailServer": "0",
	    "path": "console",
	    "contact": "lang.yu@hpe.com",
	    "name": "vie.app.console",
	    "currency": "RMB",
	    "category": "WEB",
	    "uniqueId": "1",
	    "email": "false"
	  },
	  "status": {
	    "message": "OK",
	    "code": 200
	  }
	}

## Mount Point

state -> app -> config

![APP](img/hub001.JPG)

## Summary

