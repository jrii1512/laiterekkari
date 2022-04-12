const modDate = (pvm) => {
    console.log("pvm = ", pvm)
    var day = ("0" + pvm.getDate()).slice(-2);
    var month = ("0" + (pvm.getMonth() + 1)).slice(-2);
    var today = pvm.getFullYear() + "-" + (month) + "-" + (day);
    document.getElementById("calduedate").value = today;
}

const check = ((h) => {
    console.log("check- funktio")
    if (h[17] == "2000-01-01") {
        h[17] = "";
    }
    if (h[18] === "2000-01-01") {
        h[18] = "";
    }
    if (h[25] === "2000-01-01") {
        h[25] = "";
    }
})
