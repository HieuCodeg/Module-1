let Mobile = function(battery) {
    this.battery = battery;
    this.soanthao = [];
    this.thuden = [];
    this.thudi =[];
    this.trangthai = true;
}
Mobile.prototype.check = function() {
    if (this.battery > 0 && this.trangthai == true) {
        return true;
    } else {
        return false;
    }
}
Mobile.prototype.turnon = function() {
    this.trangthai = true;
}
Mobile.prototype.turnoff = function() {
    this.trangthai = false;
}
Mobile.prototype.charge = function() {
    this.battery = this.battery +1;
}
Mobile.prototype.afteruse = function() {
    this.battery = this.battery -1;
}
Mobile.prototype.writemessage = function() {
    if (this.trangthai == true) {
        this.soanthao = prompt("Soạn thảo tin nhắn");
        this.afteruse();
    } else {
        alert("Điện thoại đang tắt");
    }
}
Mobile.prototype.sendMessage = function(otherMobile, content){
    if (this.trangthai == true) {
        otherMobile.thuden.push(content);
        this.thudi.push(content);
        this.afteruse();
        } else {
            alert("Điện thoại đang tắt");
        }
}
let nokia = new Mobile(100);
let iphone = new Mobile(100); 
function on(dienthoai) {
    if (dienthoai == "nokia") {
        nokia.turnon();
        document.getElementById('nokia').style.backgroundColor = "white";
    } else {
        iphone.turnon();
        document.getElementById('iphone').style.backgroundColor = "white";
    }
}
function off(dienthoai) {
    if (dienthoai == "nokia") {
        nokia.turnoff();
        document.getElementById('nokia').value = null;
        document.getElementById('nokia').style.backgroundColor = "black";
    } else {
        iphone.turnoff();
        document.getElementById('iphone').value = null;
        document.getElementById('iphone').style.backgroundColor = "black";
    }
}
function kiemtra(dienthoai) {
    if (dienthoai == "nokia") {
        if (nokia.check() == true) {
            document.getElementById('nokia').value= "Điện thoại " + dienthoai + " đang bật. Battery: " + nokia.battery;
        } else {
            document.getElementById('nokia').value= "Điện thoại " + dienthoai + " đang tắt";
        } 
    } else {
            if (iphone.check() == true) {
                document.getElementById('iphone').value= "Điện thoại " + dienthoai + " đang bật. Battery: " + iphone.battery;
            } else {
                document.getElementById('iphone').value= "Điện thoại " + dienthoai + " đang tắt";
            }
        }
}
function sacpin(dienthoai) {
    if (dienthoai == "nokia") {
        if (nokia.battery < 100) {
            nokia.charge();
            document.getElementById('nokia').value = nokia.battery;
        } else {
            document.getElementById('nokia').value = "Pin đầy";
        }
    } else {
        if (iphone.battery < 100) {
            iphone.charge();
            document.getElementById('iphone').value = iphone.battery;
        } else {
            document.getElementById('iphone').value = "Pin đầy";
        }
    }
}
function gui(dienthoai) {
    if (dienthoai == "nokia") {
        let thu = document.getElementById('nokia').value;
        nokia.sendMessage(iphone,thu);
        document.getElementById('nokia').value = null;
        document.getElementById('nokia').setAttribute('disabled','true');
    } else {
        let thu = document.getElementById('iphone').value;
        iphone.sendMessage(nokia,thu);
        document.getElementById('iphone').value = null;
        document.getElementById('iphone').setAttribute('disabled','true');
    }
}
function hopthuden(dienthoai) {
    if (dienthoai == "nokia") {
        if (nokia.trangthai == true) {
            document.getElementById('nokia').value = nokia.thuden;
            nokia.afteruse();
        } else {
            alert("Điện thoại nokia đang tắt" )
        }
    } else {
        if (iphone.trangthai == true) {
            document.getElementById('iphone').value = iphone.thuden;
            iphone.afteruse();
        } else {
            alert("Điện thoại iphone đang tắt");
        }
    }
}
function hopthudi(dienthoai) {
    if (dienthoai == "nokia") {
        if (nokia.trangthai == true) {
            document.getElementById('nokia').value = nokia.thudi;
            nokia.afteruse();
        } else {
            alert("Điện thoại nokia đang tắt");
        }
    } else {
        if (iphone.trangthai == true) {
            document.getElementById('iphone').value = iphone.thudi;
            iphone.afteruse();
        } else {
            alert("Điện thoại iphone đang tắt");
        }
    }
}
function soantinnhan(dienthoai) {
    if (dienthoai == "nokia") {
        document.getElementById('nokia').removeAttribute('disabled');
        document.getElementById('nokia').value = null;
    } else {
        document.getElementById('iphone').removeAttribute('disabled');
        document.getElementById('iphone').value = null;
    }
}