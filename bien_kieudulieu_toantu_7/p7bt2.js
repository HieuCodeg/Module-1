function chuyendoi(){
    let tu=document.getElementById("from").value;
    let den=document.getElementById("to").value;
    let soluong=document.getElementById("amount").value;
    let ketqua;
    if (tu=="USA" && den=="VND"){
        ketqua= "Kết quả: "+ (soluong*23.382) + " Đồng";
    }
    else if (tu=="VND" && den =="USA"){
        ketqua= "Kết quả: "+ (soluong/23.382) + " Đô la";
    }
    else if(tu=="VND"){
        ketqua="Kết quả: "+ soluong + " Đồng";
    }
    else {
        ketqua="Kết quả: "+ soluong + " Đô la";
    }
    document.getElementById("dapan").innerHTML = ketqua;
}