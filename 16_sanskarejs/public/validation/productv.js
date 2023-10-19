function validateProductForm() {
    var productId = document.getElementById("productId");
    var productName = document.getElementById("productName");
    var productPrice = document.getElementById("productPrice");
    var productQuantity = document.getElementById("productPerqty");
    var productTotalqty = document.getElementById("productTotalqty");
    var brandName = document.getElementById("productBrandname");
    var categoryName = document.getElementById("productCategory");
    var manufacturingDate = document.getElementById("productMfd");
    var expiryDate = document.getElementById("productExpirydate");
    var productDescription = document.getElementById("productDescription");
    var productImage = document.getElementById("productImage");
    var qty_unit = document.getElementById("qty-unit");
    var qty_units = document.getElementById("qty-units");


    var file = productImage.files[0];

    var productIdRegex = /^[0-9]+$/;
    var priceRegex = /^\d+(\.\d{1,2})?$/;
    // var quantityRegex = /^\d+\s*[a-z]+$/;
    var quantityRegex=/^[0-9]+$/;

    function showErrorMessage(element, message) {
        var errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('small');
            errorElement.classList.add('error-message');
            element.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearErrorMessage(element) {
        var errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    function validateField(element, regex, errorMessage) {
        if (!regex.test(element.value.trim())) {
            showErrorMessage(element, errorMessage);
            return false;
        } else {
            clearErrorMessage(element);
            return true;
        }
    }

    // if (!validateField(productId, productIdRegex, "Please enter a valid Product ID (Number only)")) {
    //     return false;
    // }

    if (productName.value.trim() === "") {
        showErrorMessage(productName, "Please enter a Product Name");
        return false;
    } else {
        clearErrorMessage(productName);
    }

    if (categoryName.value.trim() === "") {
        showErrorMessage(categoryName, "Please enter a Category Name");
        return false;
    } else {
        clearErrorMessage(categoryName);
    }

    if (!validateField(productPrice, priceRegex, "Please enter a valid Product Price")) {
        return false;
    }
    if (brandName.value.trim() === "") {
        showErrorMessage(brandName, "Please enter a Brand Name");
        return false;
    } else {
        clearErrorMessage(brandName);
    }

    if (!validateField(productQuantity, quantityRegex, "Please enter a valid Product Quantity")) {
        return false;
    }

    if (qty_unit.value.trim() === "") {
        console.log(qty_unit.value);
        showErrorMessage(qty_unit, "Please select a unit");
        return false;
    } else {
        clearErrorMessage(qty_unit);
    }
    
    if (!validateField(productTotalqty, quantityRegex, "Please enter a valid Product Quantity")) {
        return false;
    }

    if (qty_units.value.trim() === "") {
        console.log(qty_units.value);
        showErrorMessage(qty_units, "Please select a unit");
        return false;
    } else {
        clearErrorMessage(qty_units);
    }
    

   
    if (manufacturingDate.value.trim() === "") {
        showErrorMessage(manufacturingDate, "Please enter a Manufacturing Date");
        return false;
    } else {
        clearErrorMessage(manufacturingDate);
    }

    if (expiryDate.value.trim() === "") {
        showErrorMessage(expiryDate, "Please enter an Expiry Date");
        return false;
    } else {
        clearErrorMessage(expiryDate);
    }

  
    var currentDate = new Date();
    var manuDate = new Date(manufacturingDate.value);
    var expDate = new Date(expiryDate.value);

    if (manuDate > currentDate) {
        showErrorMessage(manufacturingDate, "Manufacturing Date cannot be in the future");
        return false;
    } else {
        clearErrorMessage(manufacturingDate);
    }

    if (expDate < manuDate) {
        showErrorMessage(expiryDate, "Expiry Date cannot be earlier than Manufacturing Date");
        return false;
    } else {
        clearErrorMessage(expiryDate);
    }

    if (productDescription.value.trim() === "") {
        showErrorMessage(productDescription, "Please enter a Product Description");
        return false;
    } else {
        clearErrorMessage(productDescription);
    }

    if (!file) {

        showErrorMessage(productImage, "Please upload an image");
            return false;
        }
      
    return true;
}