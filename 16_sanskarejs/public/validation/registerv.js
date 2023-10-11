function allValidate() {
    var fnamestatus = firstNameValidate();
    var lnamestatus = lastNameValidate();
    var emailstatus = mailValidate();
    var passwordstatus = passwordValidate();
    var contactstatus = contactValidate();
    var matchpassword = matchPassword();
    var streetstatus = streetValidate();
    var citystatus = cityValidate();
    var statestatus = stateValidate();
    
  
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
          nameValid.style.color = "black";
          return false;
        }
        else {
          nameValid.innerHTML = "First Name";
          nameValid.style.color = "";
        }
      }
    
    } return true;
  
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
          nameValid.style.color = "black";
          return false;
        }
        else {
          nameValid.innerHTML = "Last Name";
          nameValid.style.color = "";
        }
      }
    }
      return true;
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
        return true;
      }
      else {
        aadharValid.innerHTML = "aadhar number is incorrect";
        aadharValid.style.color = "black";
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
        gstValid.innerHTML = "aadhar number is incorrect";
        gstValid.style.color = "black";
        return false;
      }
    }
  }
  function mailValidate(email) {
    var emails = document.getElementById("email");
    var mailValid = document.getElementById("mailValid");
  
    if (emails.value.trim() =="") {
      mailValid.innerHTML = " Field Required";
      mailValid.style.color = "green";
      return false;
    }
    else {
      var reg = /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
      if(reg.test(emails.value))
             {
              mailValid.innerHTML ="Email";
              mailValid.style.color = "";
             }
             else
             {
              mailValid.innerHTML = "Invalid email";
              mailValid.style.color = "black";
                 return false;
             }
  
    }
    return true;
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
      passwordValid.style.color = "black";
    }
    else if (!checkForSpecificLetter(password, 'A', 'Z')) {
      status = false;
      passwordValid.innerHTML = "password must have 1 uppercase letter";
      passwordValid.style.color = "black";
    }
    else if (!checkForSpecificLetter(password, '0', '9')) {
      status = false;
      passwordValid.innerHTML = "password must have 1 digit";
      passwordValid.style.color = "black";
    }
    else if (!checkForSpecialSymbol(password)) {
      status = false;
      passwordValid.innerHTML = "password must have 1 special symbol($,#,@)";
      passwordValid.style.color = "black";
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
    var confirmPassword = document.getElementById("confirmpassword").value;
    var confirmPasswordValid = document.getElementById("confirmPasswordValid");   
     if(password != confirmPassword) {  
        status = false;         
        confirmPasswordValid.innerHTML = "password not matched";
        confirmPasswordValid.style.color = "black";
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
        contactValid.innerHTML ="Gst No.";
        contactValid.style.color = "";
        return true;
      }
      else {
        contactValid.innerHTML = "aadhar number is incorrect";
        contactValid.style.color = "black";
        return false;
      }
    }
   return true;
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
        if ((data.charAt(i) < 'a' || data.charAt(i) > 'z')) {
          nameValid.innerHTML = "name is incorrect";
          nameValid.style.color = "black";
          return false;
        }
        else {
          streetValid.innerHTML = "Last Name";
          streetValid.style.color = "";
        }
      }
    }
      return true;
  }