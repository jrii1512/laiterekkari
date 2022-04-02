const product = () => {
    console.log("Selecting product value")
    if (h[8] === "move") {
        document.getElementsById("product").value = "Move"
    } else if (h[8] === "care") {
        document.getElementsById("product").value = "Care"
    } else if (h[8] === "fido") {
        document.getElementsById("product").value = "Fido"
    } else if (h[8] === "pointethernet") {
        document.getElementsById("product").value = "Pointethernet"
    } else if (h[8] === "pointgsm") {
        document.getElementsById("product").value = "Pointgsm"
    } else if (h[8] === "laitelDI-2") {
        document.getElementsById("product").value = "DI-I-2"
    } else if (h[8] === "laitelDI-2-B") {
        document.getElementsById("product").value = "DI-I-2-B"
    } else if (h[8] === "locate") {
        document.getElementsById("product").value = "Locate"
    } else if (h[8] === "sw") {
        document.getElementsById("product").value = "SW"
    } else if (h[8] === "setup") {
        document.getElementsById("product").value = "Setup"
    }
}

const maint = () => {
    if (h[22] === "yes") {
        document.getElementsById("maintenanceneed").value = "Kyllä"
    } else if (h[22] === "no") {
        document.getElementsById("maintenanceneed").value = "Ei"
    }
}

const valid = () => {
    if (h[24] === "yes") {
        document.getElementsById("validationneed").value = "Kyllä"
    } else if (h[24] === "no") {
        document.getElementsById("validationneed").value = "Ei"
    }
}


const manufactureChange = () => {
    if (h[13] === "accurat") {
        document.getElementsById("mfact").value = "Accurat"
    } else if (h[13] === "agilent") {
        document.getElementsById("mfact").value = "Agilent"
    } else if (h[13] === "circuitmate") {
        document.getElementsById("mfact").value = "Circuitmate"
    } else if (h[13] === "clewaregmbh") {
        document.getElementsById("mfact").value = "Clewaregmbh"
    } else if (h[13] === "coolpowersolution") {
        document.getElementsById("mfact").value = "Coolpowersolution"
    } else if (h[13] === "datalogic") {
        document.getElementsById("mfact").value = "Datalogic"
    } else if (h[13] === "elprotronic") {
        document.getElementsById("mfact").value = "Elprotronic"
    } else if (h[13] === "fluke") {
        document.getElementsById("mfact").value = "Fluke"
    } else if (h[13] === "greinervibrografag") {
        document.getElementsById("mfact").value = "Greinervibrografag"
    } else if (h[13] === "hewletpackard") {
        document.getElementsById("mfact").value = "Hewletpackard"
    } else if (h[13] === "kenwood") {
        document.getElementsById("mfact").value = "Kenwood"
    } else if (h[13] === "kolver") {
        document.getElementsById("mfact").value = "Kolver"
    } else if (h[13] === "lenovo") {
        document.getElementsById("mfact").value = "Lenovo"
    } else if (h[13] === "lenovovivago") {
        document.getElementsById("mfact").value = "Lenovovivago"
    } else if (h[13] === "lgprecision") {
        document.getElementsById("mfact").value = "Lgprecision"
    } else if (h[13] === "mascot") {
        document.getElementsById("mfact").value = "Mascot"
    } else if (h[13] === "mettleratoledo") {
        document.getElementsById("mfact").value = "Mettleratoledo"
    } else if (h[13] === "mitutoyo") {
        document.getElementsById("mfact").value = "Mitutoyo"
    } else if (h[13] === "nationalinstruments") {
        document.getElementsById("mfact").value = "Nationalinstruments"
    } else if (h[13] === "protek") {
        document.getElementsById("mfact").value = "Protek"
    } else if (h[13] === "samson") {
        document.getElementsById("mfact").value = "Samson"
    } else if (h[13] === "symboltech") {
        document.getElementsById("mfact").value = "Symboltech"
    } else if (h[13] === "tecstar") {
        document.getElementsById("mfact").value = "Tecstar"
    } else if (h[13] === "tektronix") {
        document.getElementsById("mfact").value = "Tektronix"
    } else if (h[13] === "vivago") {
        document.getElementsById("mfact").value = "Vivago"
    } else if (h[13] === "vivagolenovo") {
        document.getElementsById("mfact").value = "Vivago-lenovo"
    }
}

const capplied = () => {
    console.log("calapplied- funktiota kutsuttu")
    alert("bling ->", h[21])
    if (h[21] === "yes") {
        document.getElementsById("calapplied").value = "yes";
    } else {
        document.getElementsById("calapplied").value = "no";
    }
}