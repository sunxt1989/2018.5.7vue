/**
 * Created by who on 2018/6/19.
 */
function unNumber(value){
    value = String(value);
    if(value.includes(',')){
        value = value.split(',').join('')
    }
    return Number(value)
}
export default{
    unNumber
}
