function goAddCamera() {
  window.location = "./pages/addCamera.html";
}

//CONFIG DOM ELEMENTS
let btn_go_add_cam = document.querySelector("#btn_go_add_cam");

btn_go_add_cam.onclick = goAddCamera;
