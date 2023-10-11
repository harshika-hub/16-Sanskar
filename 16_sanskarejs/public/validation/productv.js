function validateProductForm() {
    var productId = document.getElementById("productId");
    var productName = document.getElementById("productName");
    var productPrice = document.getElementById("productPrice");
    var productQuantity = document.getElementById("productPerqty");
    var productQuantity = document.getElementById("productTotalqty");
    var brandName = document.getElementById("productBrandname");
    var categoryName = document.getElementById("productCategory");
    var manufacturingDate = document.getElementById("productMfd");
    var expiryDate = document.getElementById("productExpirydate");
    var productDescription = document.getElementById("productDescription");
    var productImage = document.getElementById("productImage");
    var file = productImage.files[0];

    var productIdRegex = /^[0-9]+$/;
    var priceRegex = /^\d+(\.\d{1,2})?$/;
    var quantityRegex = /^\d+\s*[a-z]+$/;

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

    if (!validateField(productId, productIdRegex, "Please enter a valid Product ID (Number only)")) {
        return false;
    }

    if (productName.value.trim() === "") {
        showErrorMessage(productName, "Please enter a Product Name");
        return false;
    } else {
        clearErrorMessage(productName);
    }

    if (!validateField(productPrice, priceRegex, "Please enter a valid Product Price")) {
        return false;
    }

    if (!validateField(productTotalqty, quantityRegex, "Please enter a valid Product Quantity")) {
        return false;
    }

    
    if (!validateField(productQuantity, quantityRegex, "Please enter a valid Product Quantity")) {
        return false;
    }
    if (brandName.value.trim() === "") {
        showErrorMessage(brandName, "Please enter a Brand Name");
        return false;
    } else {
        clearErrorMessage(brandName);
    }

    if (categoryName.value.trim() === "") {
        showErrorMessage(categoryName, "Please enter a Category Name");
        return false;
    } else {
        clearErrorMessage(categoryName);
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
        // if (file.name === "") {
        //     alert('File name cannot be empty.');
        //     return false;
        // }


    return true;
}

// var fileInput = document.getElementById('fileInput');
// var file = fileInput.files[0];

// // Check if a file is selected
// 

// // Check file type
// var allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Example types
// if (!allowedTypes.includes(file.type)) {
//     alert('Invalid file type. Please select a JPEG, PNG, or PDF file.');
//     return false;
// }

// // Check file size (in bytes)
// var maxSize = 5 * 1024 * 1024; // Example: 5MB
// if (file.size > maxSize) {
//     alert('File size exceeds the maximum allowed limit (5MB).');
//     return false;
// }


