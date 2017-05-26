/**
 * Created with IntelliJ IDEA.
 * User: Yangcl
 * Date: 13-8-6
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */


var list = new Array();
Ext.define("appUtils.pageHelper" ,        //类名定义包含文件夹
{
        // 添加一个组件 ID 到 ArrayList 中
        addComponentID : function(id)
        {
                Ext.Array.push(list , id);
        } ,

        //判断组件如 window/tab panel 等是否已打开  参数：组件id
        isComponentOpen  :  function(id)
        {
            var isOpen = Ext.Array.contains(list, id );
            if(isOpen == true){
                return true;
            }
            else{
                return false;
            }
        },

        //移除这个组件Id
        removeComponentID : function(id)
        {
            Ext.Array.remove(list , id) ;
        } ,

       // 控制页面视图中间区域被打开的Tab、panel等组件的关闭与开启 ---控制的控件为Panel及其子类
       panelComponentController : function(compName )
       {
           //根据centerArea组件的ID来获取这个对象 ，然后调用add方法
           var centerArea = Ext.getCmp("centerTab");
           var openedComp = Ext.create(compName);
           //创建对象与获取对象不同；创建：对象没有加载和显示。获取：对象已经加载
           if(openedComp.isPanel == true)          //方法只用于panel及其子类对象
           {
               if( this.isComponentOpen(openedComp.id) ==  false )
               {
                   centerArea.add(openedComp);     //在Viewpoint的中心加入一个新Tab页
                   this.addComponentID(openedComp.id);
               }
               else {
                   //数组中包含组件ID，代表组件已经打开
               }
           }
           /*else{
               return ;
           }*/
       } ,

       //控制被打开的Windows组件  --控制条件为windows及其子类组件
       windowComponentController : function(compName)
       {
           var winComp = Ext.create(compName);
           if(winComp.isWindow == true)
           {
               if(this.isComponentOpen(winComp.id) == false)
               {
                   winComp.show();
                   this.addComponentID(winComp.id)
               }
               else{
                   //数组中包含组件ID，代表组件已经打开
               }
           }
           /*else{
               return ;
           }*/

       } ,

       // 控制页面视图中间区域被打开的Tab、panel等组件的关闭与开启 ---控制的控件为Panel及其子类
       containerComponentController : function(compName )
       {
            var centerArea = Ext.getCmp("centerTab");
            var openedComp = Ext.create(compName);
            if(openedComp.isContainer == true)          //方法只用于panel及其子类对象
            {
                if( this.isComponentOpen(openedComp.id) ==  false )
                {
                    centerArea.add(openedComp);     //在Viewpoint的中心加入一个新Tab页
                    this.addComponentID(openedComp.id);
                }
                else {
                }
            }
            /*else{
                return ;
            }*/
        }
}) ;



























