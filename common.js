function switchDisplay(el) {
    el.innerHTML = el.innerHTML == "Dark Mode" ? "Light Mode" : "Dark Mode";
    s = document.getElementById("stylesheet");
    if (s.getAttribute("class") == "page") {
        s.href = s.href.includes("flattener_light.css") ? "../flattener_dark.css" : "../flattener_light.css";
    } else {
        s.href = s.href.includes("flattener_light.css") ? "flattener_dark.css" : "flattener_light.css";
    }
    
}

function load(e) {
    var input = document.getElementById("input");
    input.addEventListener("change", (e) => {e.srcElement.defaultValue = e.srcElement.value})
    completeFiddle(null);
}

function completeFiddle(e) {
    var inputDiv = document.getElementsByClassName("left")[0];
    var errors = document.getElementById("errorlogs");
    try {
        const json = JSON.parse(input.innerHTML);
    } catch (err) {
        inputDiv.style.border = "solid";
        inputDiv.style.borderColor = "crimson"; 
        inputDiv.style.borderWidth = "3px";
        errors.innerHTML = err;
    }
    const json = JSON.parse(input.innerHTML);
    inputDiv.style.border = "hidden";
    errors.innerHTML = ""
    try {
        const json = JSON.parse(input.innerHTML);
    } catch (err) {
        inputDiv.style.border = "solid";
        inputDiv.style.borderColor = "magenta"; 
        inputDiv.style.borderWidth = "3px";
        errors.innerHTML = "Oops! The algorithm made an error. Send a bug report using the link below, providing the JSON that caused the error (apologies for the bug!)";
    }
    var newDict = iterateDict(json);
    var ouputText = JSON.stringify(newDict, null, 2);
    var output = document.getElementById("output");
    output.innerHTML = ouputText;
}

function iterateDict(d, defkey="", defd=null) {
    if (defd == null)
        defd = d;
    var items = Object.entries(d);
    for (entry of items) {
        var [key, val] = entry;
        defd[defkey+key] = val;
        if (typeof(val) == "object") { // to make sure this is not a number of something
            if (val.constructor == Object) { // to make sure it's not an array
                iterateDict(val, defkey+key+"/", defd);
            }
        }
    }
    return d;
}

