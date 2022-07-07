function xoamanhinh(){
    document.getElementById("manhinh").value="";
}
function hien(value){
    document.getElementById("manhinh").value += value;
}
function tinh(){
    var dem= document.getElementById("manhinh").value;
    var i= eval(dem);
    document.getElementById("manhinh").value=i;
}