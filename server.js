

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {

    testAPI();
  } else {

    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function logout(){
  FB.logout(function(response){
  console.log(response)
  //window.location = '/google.com'
  })
}

// let logout_event = function(response) {
//   console.log("logout_event");
//   console.log(response.status);
//   console.log(response);
//}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '167057163935805',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  //FB.Event.subscribe('auth.logout', logout_event)

};


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me',{
    fields :['name','email', 'gender', 'picture', ]
  }, function(response) {
    console.log('LU DAPET INI WOI LIAT ', response)
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
function share() {
  FB.ui({
    method: 'share',
    mobile_iframe:true,
    quote:"Selamat anda telah Menang",
    href:"https://hacktiv8.com",
  },function(res){
    
  })
}
