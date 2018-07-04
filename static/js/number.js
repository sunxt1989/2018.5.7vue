/**
 * Created by who on 2018/6/19.
 */
function number(value){

    value = String(value);
    if(!value) return '0.00';

    if(value.includes(',')){
        value = value.split(',').join('')
    }
    //console.log(value);

    var intPart = Number(value).toFixed(0); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

    var floatPart = ".00"; //预定义小数部分

    if(value.includes('.')){
        var value2Array = value.split(".");
        if(value2Array[1].length == 0){
            return intPartFormat + "." + floatPart;
        }else if(value2Array[1].length == 1){
            floatPart = value2Array[1] + '0'
        }else if(value2Array[1].length == 2){
            floatPart = value2Array[1].toString(); //拿到小数部分
        }else{
            floatPart = value2Array[1].substr(0,2);
        }
        return intPartFormat + "." + floatPart;

    }else{
        return intPartFormat + floatPart;
    }

}
export default{
    number
}
