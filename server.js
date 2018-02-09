

function statusChangeCallback(response) {

  localStorage.setItem('accessToken', response.authResponse.accessToken)
  // localStorage.setItem('UserId', response.authResponse.userID)
  if (response.status == 'connected') {
    if( window.location.pathname !=='/profile.html'){
    testAPI();
    }
  } else {

    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}


function checkLoginState() {
  console.log('loginstate');
  FB.login(function(response) {
    statusChangeCallback(response);
  },{scope:'public_profile,email'});
}

function logout(){
  FB.logout(function(response){
    localStorage=null
    localStorage.clear()
    window.location="index.html"
  console.log(response)
  //window.location = '/google.com'
  })
}

// let logout_event = functifunctionNameon(response) {
//   console.log("logout_event");
//   console.log(response.status);
//   console.log(response);
//}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1801532450140524',
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
  console.log(localStorage.getItem('accessToken'),'ini testAPI')
  axios.post('http://localhost:3000/users',{} ,{
    headers: {
      accessToken: localStorage.getItem('accessToken')
      // UserId     : localStorage.getItem()
    }
  }).then(response => {
    console.log(response,'ini response after login')
    localStorage.setItem('name', response.data.user[0].name)
    localStorage.setItem('email', response.data.user[0].email)
    localStorage.setItem('foto', response.data.user[0].photoProfile)
    localStorage.setItem('UserId', response.data.user[0]._id)
    window.location = '/profile.html '
    // data ini yang belum diapa apain !!
    // window.location = ('')
    // If request is good...
    // console.log(,'ini then')
  })
    .catch((error) => {
      console.log('error 3 ' + error);
    });
}
function share() {
  FB.ui({
    method: 'share',
    mobile_iframe:true,
    quote:`Selamat anda mendapatkan point sebesar ${localStorage.point}`,
    href:"https://hacktiv8.com",
  },function(res){

  })
}
