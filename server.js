

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  localStorage.setItem('accessToken', response.authResponse.accessToken)
  localStorage.setItem('UserId', response.authResponse.userID)
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
  axios.get('http://localhost:3000/users', {
    headers: {
      accessToken: localStorage.getItem('accessToken')
      // UserId     : localStorage.getItem()
    }
  }).then(response => {
    console.log(response, 'ini dari router')
    window.location = '/profile.html '
    // data ini yang belum diapa apain !!
    // window.location = ('')
    // If request is good...
    // console.log(response,'ini then')
  })
    .catch((error) => {
      console.log('error 3 ' + error);
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
