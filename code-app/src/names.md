# Redux Names

## 1.工具规范

工具类的使用，工具类主要位于`unm`目录，里边包含四个子目录：

* config：Vie引擎的配置文件目录；
* data：Rtv的全局数据目录；
* global：工具类内部调试以及诊断基础函数；
* kit：开放给每个app的工具类

## 2.组件规范

组件类用于定义各种共享组件，共享组件位于`components`目录：

* control：基础控件目录，包含field，input，link，button等最基础的交互式控件；
* dialog：弹出框专用控件目录；
* logo：专用logo目录，目前包含的是vie的应用Logo；
* render：渲染工具（仅在目录内部使用）
* web：大组件目录，比如一个完整表单、一个完整内容页面等；

## 3.应用规范

所有的独立应用主要位于`app`目录下，以应用的`path`命名；

* modules：应用中包含的所有模块；
* page：模板页面目录，全局使用的模板信息，RTV中目前有两套，一套为登录页，一套为内部的管理界面；
* routes.js：应用主路由文件；
* shared.js：连接工具和组件的共享工具类文件；

## 4.模块规范

所有的模块应用主要位于`app/modules`目录下；

* module.js：当前模块的配置文件；
* routes.js：当前模块的路由文件；
* ui/Content.js：该模块使用的React组件；
* ui/Content.sass：该模块使用的CSS风格文件；
* data/data.js：当前模块使用的支持国际化的配置文件数据目录；
* core/Redux.Redux.js：Redux中的Action组件专用；
* core/ActionTypes.js：Redux中的Action Type映射类；
* core/Content.js：Redux中使用的Dispatch -> Props，State -> Props的连接专用类；
* core/Reducer.js：Redux中的Reducer组件；

### 4.1. Redux Action

Action中的函数命名规范如下：

* initiate(props,params)：固定函数，用于执行组件初始化；
	* props：当前Redux组件的Props；
	* params：初始化所需要的特殊参数；

* fn*：所有的Action全部使用fn命名函数；
	* fnSh*：搜索专用函数前缀；
	* fnUp*：更新专用函数前缀；
	* fnAd*：添加专用函数前缀；
	* fnDe*：删除专用函数前缀；
	* fnQy*：查询读取专用函数前缀；
	* fnEx*：导出专员函数前缀；

注意：这里定义的所有Action都会默认使用Mapping，Mapping规则如：

	initiate：initiate(props,params)
	fn*：(state) => dispatch(fn*(state));

### 4.2. Redux Action Types

Action Type所有类型命名规范如下：

	<MODEL>_<TYPE>_<RET>

参考片段：

	ACCOUNT_VIT_SUCCESS:"$$RTV/ACCOUNT_VIT_SUCCESS",
	ACCOUNT_VST_SUCCESS:"$$RTV/ACCOUNT_VST_SUCCESS"

* VIT：初始化专用函数，Vie Init Action
* VST：搜索专用函数，Vie Search Action
* VAT：通用函数，Vie Action
* VCT：添加专用函数，Vie Create Action
* VMT：更新专用函数，Vie Modify Action
* VQT：读取查询专用函数，Vie Query Action
* VDT：删除专用函数，Vie Delete Action
* VRT：报表专用函数，Vie Report Action

结果目前只有两种：`SUCCESS/FAILURE`，全局函数如：`$$RTV/UNM/***`，这种一般跟着组件走，内容随意，直接在`unm/config/vie.json`中直接配置；

### 4.3. Redux Shared

这里列举所有使用了共享工具的Redux组件：

* `Container`中：
	* `MOD.$$.RDX.S2P.module`：通用的基于Module的映射处理，State -> Props
	* `MOD.$$.RDX.D2P.module`：通用的基于Module的映射处理，Dispatch -> Props
* `Reducer`中：
	* `MOD.$$.DATA.initMod(MOD.STATE,{})`：初始化State；
	* `MOD.$$.RDX.MG.failure()`：Action操作失败的标准函数；
	* `MOD.$$.RDX.MG.success(MOD.STATE.module)`：Action操作成功的标准函数；
	* `MDO.$$.RDX.RD(HANDLERS,initialState)`：基于Module的连接方法：connect调用；

### 4.4. Module配置说明：

	  // Application Configuration
	  CONFIG: config,
	  // Module UI Data
	  DATA: data,
	  // Module Init State
	  STATE: {
	    app:{
	      "name":config.NAME,
	      "path":config.PATH
	    },
	    module:"login.content",
	  },
	  // Shared Global Kit
	  $$:$$,
	  // Action List
	  Act: Act,
	  // Web Field
	  UI: UI
以上是Module的配置文件片段：

* CONFIG：全局应用配置，读取应用目录下的`config.json`；
* DATA：模块数据配置，读取`modules/data/data.js`，支持国际化；
* STATE：模块使用的初始化状态表，`module`必须改动，这是模块的名称；
* $$：全局工具类，从`shared.js`中来，访问`unm`目录下的所有工具；
* Act：当前模块中定义的所有Redux Action列表；
* UI：全局组件类，从`shared.js`中来，访问`components`目录下的所有共享组件；

## 5.状态树说明：

使用箭头模式到最具有含义的节点：

### 5.1.所有模块共享

* app：应用配置信息；
* app -> name：应用名称；
* app -> config：应用配置数据（来自Vie Engine Api，访问后台的APP和APP_CONFIG表）；
* app -> status -> isLogged：是否登录；
* app -> status -> isAuthorized：是否授权；
* app -> status -> isLoad：页面数据是否加载完成；
* app -> user：登录过后的用户数据；
* app -> user -> token：登录过后用户的访问令牌；
* app -> ui：模板界面信息；
* app -> ui -> top -> in：（已登录）顶部工具栏
* app -> ui -> top -> out：（未登录）顶部工具栏
* app -> ui -> menu：菜单栏
* app -> ui -> footer：页面底部工具栏
* app -> ui -> nav：当前页面导航栏

### 5.2.模块专用

* content：内容页（模块根节点）
* content -> module：模块名称
* content -> (name) -> data：当前模块操作数据；
* content -> (name) -> data -> initialValues：Redux Form专用初始化Form的数据信息
* content -> config：模块配置
* content -> config -> ui：模块页面基本信息；
* content -> config -> form：当前页面为FORM页，FORM相关信息；
* content -> config -> form -> search：搜索专用FORM页配置信息；
* content -> config -> list：当前页面为LIST页，LIST相关信息；
* content -> config -> tab：TAB页面专用配置；

## 6.基本工具类说明

* DATA：数据提供类；
* VALVE：Form表单验证专用类；
* EPT：加密专用类
* API：远程访问专用类；
* CONFIG：当前Vie全局配置数据；
* STC：Semantic专用类；
* RDX：Redux专用类；
* F：Form表单基本工具类；
* D：Dialog弹出框专用工具类；
* T：Tab页专用工具类；
* C：Button、Link点击事件专用类；
* inject：全局唯一，注入Reducer的类；
* _DG：Debug调试类（后期可移除）



