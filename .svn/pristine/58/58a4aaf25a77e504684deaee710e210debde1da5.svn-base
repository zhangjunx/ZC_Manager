/* 文本域限制和显示字体的js控制
 * <div>还可以输入<span style="font-family: Georgia; font-size: 26px;" id="wordCheck">50</span>个字符 </div>
 **/
var maxstrlen=50;
    function Q(s){return document.getElementById(s);}
    function checkWord(c){
        len=maxstrlen;
        var str = c.value;
        myLen=getStrleng(str);
        var wck=Q("wordCheck");
        if(myLen>len*2){
            c.value=str.substring(0,i+1);
        }
        else{
            wck.innerHTML = Math.floor((len*2-myLen)/2);
           }
    }
    function getStrleng(str){
        myLen =0;
        i=0;
        for(;(i<str.length)&&(myLen<=maxstrlen*2);i++){
        if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
        myLen++;
        else
        myLen+=2;
    }
    return myLen;
}
    
    
    
