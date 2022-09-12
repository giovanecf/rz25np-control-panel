function insertCamera(db, camera) {
  // create a new transaction
  const txn = db.transaction("Cameras", "readwrite");

  // get the cameras object store
  const store = txn.objectStore("Cameras");
  //
  let query = store.put(camera);

  // handle success case
  query.onsuccess = function (event) {
    console.log(event);
  };

  // handle the error case
  query.onerror = function (event) {
    console.log(event.target.errorCode);
  };

  // close the database once the
  // transaction completes
  txn.oncomplete = function () {
    db.close();

    alert("Add new camera!");
  };
}

function addCamera() {
  let name = document.querySelector("#input_name").value;
  let ip = document.querySelector("#input_ip").value;

  if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return;
  }

  var request = window.indexedDB.open("CameraControlDB", 2);

  request.onupgradeneeded = (event) => {
    let db = event.target.result;

    // create the Contacts object store
    // with auto-increment id
    let store = db.createObjectStore("Cameras", {
      autoIncrement: true,
    });

    // create an index on the email property
    let index = store.createIndex("ip", "ip", {
      unique: true,
    });
  };

  request.onerror = function (event) {
    alert("Error", event);
    console.log("Error", event);
  };
  request.onsuccess = function (event) {
    console.log("Deu certo", event);
    const db = event.target.result;

    insertCamera(db, { name, ip });
  };
}

//CONFIG DOM ELEMENTS
let btn_add_cam = document.querySelector("#btn_add_cam");

btn_add_cam.onclick = addCamera;
