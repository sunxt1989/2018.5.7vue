/**
 * Created by who on 2018/6/19.
 */
function number(value){
    value = String(value);
    if(!value || value == '' || value == null || value == 'undefined') return '0.00';

    if(value.includes(',')){
        value = value.split(',').join('')
    }
    let intPart = value < 0 ? Math.ceil(value) : Math.floor(value); //获取整数部分 向下取整
    let intPartFormat = (value < 0 && value > -1) ? '-0' : intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    let floatPart = ".00"; //预定义小数部分

    if(value.includes('.')){
        var value2Array = value.split(".");
        if(value2Array[1].length == 0){
            return intPartFormat + floatPart;
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
