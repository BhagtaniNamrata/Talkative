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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        Like = message_data['Like'];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>"
                        message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>"
                        like_button = "<button class='btn form-controll' id=" + firebase_message_id + "value=" + Like + "onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + Like + "</span></button><hr>"

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("click on like button -" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            Like: updated_likes
      });


}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}