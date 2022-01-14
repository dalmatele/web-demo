// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// import { getAuth, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
$(document).ready(function(){
    var request = new RestApi();
    var chart = new ChartDemo();    
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
        apiKey: "api-key",
        authDomain: "example.com",
        projectId: "some_id",
        storageBucket: "some_bucket",
        messagingSenderId: "556900542977",
        appId: "app-id",
        measurementId: "measure-id"
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
    });
    
});