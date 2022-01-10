// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// import { getAuth, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
$(document).ready(function(){
    var request = new RestApi();    
    $(".btn").click(function(){
        var id = $(this).attr("id");
        console.log(id);
        var req = {
            id: id
        }
        request.sendRequest("POST", "http://localhost:3001", req, "json", function(data, textStatus, jqXHR){
            console.log("ok");
        }, function(){
            console.log("error");
        });
    });   
    $("#verify").click(function(){
        var phoneNumber = $("#phonenumber").val();
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
            }).catch((error) => {
                console.log(error);
            });
    }) 
    const firebaseConfig = {
        apiKey: "AIzaSyBLZYZfSRhlsAnwKftZGEKyKsy55kCniDA",
        authDomain: "topicanative-ccc8e.firebaseapp.com",
        projectId: "topicanative-ccc8e",
        storageBucket: "topicanative-ccc8e.appspot.com",
        messagingSenderId: "556900542977",
        appId: "1:556900542977:web:1736dc5f88abeafa57ae00",
        measurementId: "G-C2H61SDB55"
      };
    const app = firebase.initializeApp(firebaseConfig);  
    // firebase.auth().useDeviceLanguage();  
    // const auth = app.auth();  
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        "size": "invisible",
        "callback": (response) => {
            onSignInSubmit();
        }
    });    
    $("#confirm").click(function(){
        const otp = $("#otp").val();
        window.confirmationResult.confirm(otp)
            .then((result) => {
                const user = result.user;
                alert("PhoneNumber is verified!");

            }).catch((error) => {
                console.log(error);
            })
    })
});