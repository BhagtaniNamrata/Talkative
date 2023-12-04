const firebaseConfig = {
    apiKey: "AIzaSyDWBG9dLN3nu5nCMpw24h5nj3O9E8fJ9EU",
    authDomain: "talkative-d19c1.firebaseapp.com",
    databaseURL: "https://talkative-d19c1-default-rtdb.firebaseio.com",
    projectId: "talkative-d19c1",
    storageBucket: "talkative-d19c1.appspot.com",
    messagingSenderId: "1022799113305",
    appId: "1:1022799113305:web:e9cab3980fc311bfe75548",
    measurementId: "G-QCPQQ3VZ0E"
  };
  



firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {

    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);
    window.location = "Talkative_messagepage.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room Name -" + Room_names);
            row = "<div class= 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "talkative_messagepage.html";
}

function logout() {
    console.log(name);
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}