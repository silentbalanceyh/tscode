常用函数以及流程

控件用例说明

Hidden：
此类型字段不会显示并注册到 redux-form上面，并可以不写 state 相关配置。和其它的显示字段一样会提交到后端。
{
    "name": "uniqueIdSU",
    "cid": "hdUniqueIdSU",
    "order": 601,
    "type": "field.Hidden",
    "controlId": {
        "$REF$": "(ui.control,type=FORM,cid=fmHTLMember,pageId=(ui.page,app=htl,path=/sale/members))"
    }
}


loaderHidden:
在 Hidden 控件的基础上增加了给其它字段二次加载数据的功能。下例为，monitor “uniqueIdSU” 字段(自身),当值有变化时使用 ingest 部分来
请求运程数据，并按 linker 部分赋值。
{
    "name": "uniqueIdSU",
    "cid": "hdUniqueIdSU",
    "order": 601,
    "type": "field.LoaderHidden",
    "controlId": {
        "$REF$": "(ui.control,type=FORM,cid=fmHTLMember,pageId=(ui.page,app=htl,path=/sale/members))"
    },
    "modifier": {
        "fieldset": "MEMBER",
        "location":[100,0],
        "monitor":{
            "uniqueIdSU":["inputes","fmHTLMember", "values","uniqueIdSU"]
        },
        "ingest":{
            "uri":"/res/idc/q/user/:userId",
            "input":{
                "userId":["monitor","uniqueIdSU"]
            },
            "linker":{
                "cardNumber":"txtwechat",
                "nativePlace":"txtweibo"
            }
        }
    }
}

LinkerBox:
在 TextBox 控件的基础上增加了给其它字段二次加载数据的功能。monitor, ingest, linker 部分配置和 loaderHidden 一致。
