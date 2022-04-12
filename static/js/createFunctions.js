
const populate = () => {
    console.log("populate function called")
    document.getElementById("pre").value = "TEST";
    document.getElementById("cat").value = "666";
    document.getElementById("catdesc").value = "Kategorian kuvaus";
    document.getElementById("model").value = "Testi malli";
    document.getElementById("serialnro").value = "12345";
    document.getElementById("manlocation").value = "Tuusula";
    document.getElementById("purchaseby").value = "Herra x";
    document.getElementById("supplier").value = "ML";
    document.getElementById("eqdesc").value = "Testi kuva";
    //document.getElementById("calInput").value = 2

    var Eiw = new Date();

    var day = ("0" + Eiw.getDate()).slice(-2);
    var month = ("0" + (Eiw.getMonth() + 1)).slice(-2);
    var today = Eiw.getFullYear() + "-" + (month) + "-" + (day);
    document.getElementById("purchdate").value = today;
}

const today = () => {
    console.log("today- funktio")
    var Eiw = new Date();
    var day = ("0" + Eiw.getDate()).slice(-2);
    var month = ("0" + (Eiw.getMonth() + 1)).slice(-2);
    var today = Eiw.getFullYear() + "-" + (month) + "-" + (day);
    document.getElementById("purchdate").value = today;
    return today;
}

export default {populate}