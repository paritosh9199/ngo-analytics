console.log("connected");
var database = firebase.database();


document.getElementById("btn-submit").addEventListener('click', function () {
    setQuery();
});

function upload_file(fileVar, type) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var file = fileVar;

    var fileName = "analytics_query_data";
    var qry = storageRef.child(`analytics_query/${fileName}`);
    var uploadTask = qry.put(file);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        update_progress(progress);
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        alert("Error while parsing the file");
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("dp", downloadURL);
            var dataLink = downloadURL;
            var database = firebase.database();
            database.ref().child("analytics").child("link").set(dataLink);
        });
    });


} 

function update_progress_lsc(prog) {
    
    if (prog == '100') {
        // document.getElementById("spinnerPara2").innerHTML = "Success";
        // document.getElementById("spinner2").stop();
        // document.getElementById("spinner2").style.display = "none";
        setTimeout(function () {
            // window.location = "/analytics";
            // change_ui()
        }, 3000);

    }else if(prog > '0'&& prog < '100'){
        //do something 
        //show spinner
    }
}

function change_ui(){
    //write the change ui function here!
    
}


function setQuery() {
    var pc = document.getElementById("pcno").value;
    var ac = document.getElementById("acno").value;
    var psn = document.getElementById("psno").value;
    var age = document.getElementById("age").value;
    var cst = document.getElementById("caste").value;
    var relg = document.getElementById("religion").value;
    var prof = document.getElementById("prof").value;
    var edu = document.getElementById("eduqual").value;
    var hno = document.getElementById("hno").value;
    var mandal = document.getElementById("mndl").value;
    var revD = document.getElementById("rdiv").value;
    var panch = document.getElementById("pdiv").value;

    var query_object = {
        "pc": pc,
        "ac": ac,
        "psn": psn,
        "age": age,
        "cst": cst,
        "relg": relg,
        "prof": prof,
        "edu": edu,
        "hno": hno,
        "mandal": mandal,
        "revD": revD,
        "panch": panch
    };

    if (pc != null && pc != "") {
        query_object.pc = pc;
    }
    if (ac != null && ac != "") {
        query_object.ac = ac;
    }
    if (psn != null && psn != "") {
        query_object.psn = psn;
    }
    if (age != null && age != "") {
        query_object.age = age;
    }
    if (cst != null && cst != "") {
        query_object.cst = cst;
    }
    if (relg != null && relg != "") {
        query_object.relg = relg;
    }
    if (prof != null && prof != "") {
        query_object.prof = prof;
    }
    if (edu != null && edu != "") {
        query_object.edu = edu;
    }
    if (hno != null && hno != "") {
        query_object.hno = hno;
    }
    if (mandal != null && mandal != "") {
        query_object.mandal = mandal;
    }
    if (revD != null && revD != "") {
        query_object.rdiv = revD;
    }
    if (panch != null && panch != "") {
        query_object.pdiv = pdiv;
    }
    // post("/",query_object,"get");

    console.log(JSON.stringify(query_object));
    database.ref().child("analytics").child("query").set(query_object);

}

