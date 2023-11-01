function showOtp(){
  var otpInput=document.getElementById('otp');
  var r_btn=document.getElementById('r-btn');

  otpInput.style.display="block";
  r_btn.style.display="block";



}

function gstclick(){
        


  var select = document.getElementById("gstselect");

  var selectedOption = select.options[select.selectedIndex];
  var selectedValue = selectedOption.value;

  var license_number = document.getElementById('license_number');
  var gst = document.getElementById('gst_number');
  var gstNO =document.getElementById('gstNoValid');
  var LicenseValid =document.getElementById('LicenseValid');


  // var selectedOption = dropdown.options[dropdown.selectedIndex];


if(selectedValue=='GST')
{

gst.style.display="block";
license_number.style.display="none";
gstNO.style.display="block";
LicenseValid.style.display="none";



}
else if(selectedValue=='license_number')
{

license_number.style.display="block";
gst.style.display="none";
LicenseValid.style.display="block";
gstNO.style.display="none";
}
else if(selectedValue=='letter')
{
  gst.style.display="none";
  gstNO.style.display="none";
  license_number.style.display="none";
  LicenseValid.style.display="none";
}
else if(selectedValue=='')
{
  gst.style.display="none";
  gstNO.style.display="none";
  license_number.style.display="none";
  LicenseValid.style.display="none";
}

}
function allValidate(e) {
    var fnamestatus = firstNameValidate();
    var lnamestatus = lastNameValidate();
    var emailstatus = mailValidate();
    var passwordstatus = passwordValidate();
    var contactstatus = contactValidate();
    var matchpassword = matchPassword();
    var streetstatus = streetValidate();
    var citystatus = cityValidate();
    var statestatus = stateValidate();
    var statestatus = zipcodeValidate();
    
  
    // var nameValid = document.getElementById("firstNameValid");
    var mailValid = document.getElementById("mailValid");
    var passwordValid = document.getElementById("passwordValid");
    var cpassword = document.getElementById("confirmPasswordValid");
    var address = document.getElementById("addressValidate");
    var qualificationValid = document.getElementById("languageValid");
    var genderValid = document.getElementById("genderValid");
    var hobbyValid = document.getElementById("hobbyValid");
  }
  function firstNameValidate(name) {
    var name = document.getElementById("firstname");
    var nameValid = document.getElementById("firstNameValid");
  
    if (name.value.trim() == "") {
      nameValid.innerHTML = "Field Required";
      nameValid.style.color = "green";
      return false;
    }
    else {
      var data = name.value;
      for (i = 0; i < data.length; i++) {
        if ((data.charAt(i) < 'A' || data.charAt(i) > 'Z') && (data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          nameValid.innerHTML = "name is incorrect";
          nameValid.style.color = "red";
          nameValid.style.fontWeight="bold";
          return false;
        }
        else {
          nameValid.innerHTML = "First Name";
          nameValid.style.color = "";
        }
      }
    
    }
  
  }
  
  function lastNameValidate(name) {
    var name = document.getElementById("lastname");
    var nameValid = document.getElementById("lastNameValid");
  
    if (name.value.trim() == "") {
      nameValid.innerHTML = "   Field Required";
      nameValid.style.color = "green";
      return false;
    }
    else {
      var data = name.value;
      for (i = 0; i < data.length; i++) {
        if ((data.charAt(i) < 'A' || data.charAt(i) > 'Z') && (data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          nameValid.innerHTML = "name is incorrect";
          nameValid.style.color = "red";
          nameValid.style.fontWeight="bold";
          return false;
        }
        else {
          nameValid.innerHTML = "Last Name";
          nameValid.style.color = "";
        }
      }
    }
      
  }
  function aadharCardValidate() {
    var aadhar = document.getElementById("aadharcard");
    var aadharValid = document.getElementById("aadharCardValid");
  
    if (aadhar.value.trim() == "") {
      aadharValid.innerHTML = "   Field Required";
      aadharValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^[]{12}$/;
      if (reg.test(aadhar.value)) {
        aadharValid.innerHTML ="Aadhar number";
        aadharValid.style.color = "";
       
        // return true;
      }
      else {
        aadharValid.innerHTML = "aadhar number is incorrect";
        aadharValid.style.color = "red";
        nameValid.style.fontWeight="bold";
        return false;
      }
    }
  }
  
  function gstNoValidate() {
    var gst = document.getElementById("gstno");
    var gstValid = document.getElementById("gstNoValid");
  
    if (gst.value.trim() == "") {
      gstValid.innerHTML = "   Field Required";
      gstValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^[]{12}$/;
      if (reg.test(gst.value)) {
        gstValid.innerHTML ="Gst No.";
        gstValid.style.color = "";
        return true;
      }
      else {
        gstValid.innerHTML = "GST number is incorrect";
        gstValid.style.color = "red";
        nameValid.style.fontWeight="bold";
        return false;
      }
    }
  }
  function mailValidate(email) {
    var email = document.getElementById("email");
    var mailValid = document.getElementById("mailValid");
  
    if (email.value.trim() =="") {
      mailValid.innerHTML = " Field Required";
      mailValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^\w+([\.-])?\w\d*@[a-z]*([\.][a-z]{2,3})+$/;
      if(reg.test(email.value))
             {
              mailValid.innerHTML ="Email";
              mailValid.style.color = "";
             }
             else
             {
              mailValid.innerHTML = "Invalid email";
              mailValid.style.color = "red";
              mailValid.style.fontWeight="bold";
                 return false;
             }
  
    }
    
  }
  
  function togglePassword() {
    var obj = document.getElementById("showHidePassword");
    var password = document.getElementById("password");
    if (obj.innerText == "Show") {
      password.type = "text";
      obj.innerHTML = "Hide";
    }
    else {
      password.type = "password";
      obj.innerHTML = "Show";
    }
  }
  function passwordValidate() {
    var status = true;
    var password = document.getElementById("password").value;
    var passwordValid = document.getElementById("passwordValid");
    if (password.length == 0) {
      status = false;
      passwordValid.innerHTML = "Field required";
      passwordValid.style.color = "green";
    }
    else if (password.length < 8) {
      status = false;
      passwordValid.innerHTML = "password must be at least 8 letter long.";
      passwordValid.style.color = "red";
      passwordValid.style.fontWeight="bold";
    }
    else if (!checkForSpecificLetter(password, 'A', 'Z')) {
      status = false;
      passwordValid.innerHTML = "password must have 1 uppercase letter";
      passwordValid.style.color = "red";
    }
    else if (!checkForSpecificLetter(password, '0', '9')) {
      status = false;
      passwordValid.innerHTML = "password must have 1 digit";
      passwordValid.style.color = "red";
    }
    else if (!checkForSpecialSymbol(password)) {
      status = false;
      passwordValid.innerHTML = "password must have 1 special symbol($,#,@)";
      passwordValid.style.color = "red";
    }
    else{
      passwordValid.innerHTML = "";
    }
    // alert(status);
    return status;
  }
  function checkForSpecificLetter(data, i, j) {
    for (index in data) {
      if (data[index] >= i && data[index] <= j)
        return true;
    }
    return false;
  }
  function checkForSpecialSymbol(data) {
    for (index in data) {
      if (data[index] == '@' || data[index] == '#' || data[index] == '$')
        return true;
    }
    return false;
  }
  function matchPassword() {
    var status = true;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var confirmPasswordValid = document.getElementById("confirmPasswordValid");   
     if(password != confirmPassword) {  
        status = false;         
        confirmPasswordValid.innerHTML = "password not matched";
        confirmPasswordValid.style.color = "red";
        confirmPasswordValid.style.fontWeight="bold";
      }         
      else
        confirmPasswordValid.innerHTML = " ";
      return status;
    }
  
  function contactValidate(contact) {
    var contact = document.getElementById("contact");
    var contactValid = document.getElementById("contactValid");
    if (contact.value.trim() == "") {
      // alert("hello");
      contactValid.innerHTML = "   Field Required";
      contactValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^[6789][0-9]{9}$/;
      if (reg.test(contact.value)) {
        contactValid.innerHTML ="Contact No.";
        contactValid.style.color = "";
        // return true;
      }
      else {
        contactValid.innerHTML = "contact number is incorrect";
        contactValid.style.color = "red";
        contactValid.style.fontWeight="bold";
        return false;
      }
    }
  //  return true;
  }
  function streetValidate(street) {
    // alert("helooo");
    var street = document.getElementById("street");
    var streetValid = document.getElementById("streetValid");
  
    if (street.value.trim() == "") {
      streetValid.innerHTML = "   Field Required";
      streetValid.style.color = "green";
      return false;
    }
    else {
      var data = street.value;
      for (i = 0; i < data.length; i++) {
        if ((data.charAt(i) < 'A' || data.charAt(i) > 'Z') && (data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          streetValid.innerHTML = "Street is incorrect";
          streetValid.style.color = "red";
          streetValid.style.fontWeight="bold";
          return false;
        }
        else {
          streetValid.innerHTML = "Street";
          streetValid.style.color = "";
        }
      }
    }
  }
  function cityValidate(city) {
    // alert("helooo");
    var city = document.getElementById("city");
    var cityValid = document.getElementById("cityValid");
  
    if (city.value.trim() == "") {
      cityValid.innerHTML = "   Field Required";
      cityValid.style.color = "green";
      return false;
    }
    else {
      var data = city.value;
      for (i = 0; i < data.length; i++) {
        if ((data.charAt(i) < 'A' || data.charAt(i) > 'Z') && (data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          cityValid.innerHTML = "City is incorrect";
          cityValid.style.color = "red";
          cityValid.style.fontWeight="bold";
          return false;
        }
        else {
          cityValid.innerHTML = "City ";
          cityValid.style.color = "";
        }
      }
    }
  }
  function stateValidate(state) {
    // alert("helooo");
    var state = document.getElementById("state");
    var stateValid = document.getElementById("stateValid");
  
    if (state.value.trim() == "") {
      stateValid.innerHTML = "   Field Required";
      stateValid.style.color = "green";
      return false;
    }
    else {
      var data = state.value;
      for (i = 0; i < data.length; i++) {
        if ((data.charAt(i) < 'A' || data.charAt(i) > 'Z') && (data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          stateValid.innerHTML = "State is incorrect";
          stateValid.style.color = "red";
          stateValid.style.fontWeight="bold";
          return false;
        }
        else {
          stateValid.innerHTML = "State";
          stateValid.style.color = "";
        }
      }
    }
  }
  function zipcodeValidate(zipcode) {
    var zipcode = document.getElementById("zipcode");
    var zipcodeValid = document.getElementById("zipcodeValid");
    if (zipcode.value.trim() == "") {
      zipcodeValid.innerHTML = "   Field Required";
      zipcodeValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^[0-9]{6}$/;
      if (reg.test(zipcode.value)) {
        zipcodeValid.innerHTML ="Zip Code";
        zipcodeValid.style.color = "";
        // return true;
      }
      else {
        zipcodeValid.innerHTML = "ZipCode is incorrect";
        zipcodeValid.style.color = "red";
        zipcodeValid.style.fontWeight="bold";
        return false;
      }
    }
  }


  function gstNoValidate() {
    var gst = document.getElementById("gst_number");
    var gstValid = document.getElementById("gstNoValid");
  
    if (gst.value.trim() == "") {
      gstValid.innerHTML = "   Field Required";
      gstValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^[0-9]{15}$/;
      if (reg.test(gst.value)) {
        gstValid.innerHTML ="Gst No.";
        gstValid.style.color = "";
        return true;
      }
      else {
        gstValid.innerHTML = "gst number is incorrect";
        gstValid.style.color = "black";
        return false;
      }
    }
  }

  function licenseNo(){
    var license = document.getElementById("license_number");
    var gstValid = document.getElementById("LicenseValid");

    if (license.value.trim() == "") {
      gstValid.innerHTML = "   Field Required";
      gstValid.style.color = "green";
      return false;
    }
    else
    {
      const reg = /^[A-Z0-9]{6,15}$/;
      if (reg.test(license.value)) {
        gstValid.innerHTML ="License No.";
        gstValid.style.color = "";
        return true;
      }
      else {
        gstValid.innerHTML = "License number is incorrect";
        gstValid.style.color = "black";
        return false;
      }
    }

  }