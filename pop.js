document.addEventListener('DOMContentLoaded', function () {
    // Remove the event listeners for buttons since we're using onclick redirects
    const popupForm = document.getElementById('popupForm');
    const closePopup = document.getElementById('closePopup');
    const contactForm = document.getElementById('contactForm');

    // Inject popup styles into the document dynamically so we don't need to change any CSS files
    const style = document.createElement('style');
    style.innerHTML = `
        .popup-form {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            display: none; 
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            backdrop-filter: blur(5px);
        }
        .popup-form.active {
            display: flex;
        }
        .popup-content {
            background: rgba(10, 10, 26, 0.95);
            padding: 25px 35px;
            border-radius: 15px;
            width: 100%;
            max-width: 800px;
            position: relative;
            border: 1px solid rgba(0, 240, 255, 0.2);
            box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
            max-height: 95vh;
            overflow-y: auto;
        }
        .popup-content .close-popup {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #00f0ff;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }
        .popup-content .close-popup:hover {
            transform: scale(1.1);
            color: #ff00f0;
        }
        .popup-content h2 {
            text-align: center;
            font-size: 1.6rem;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #00f0ff, #ff00f0);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .popup-content .form-row {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }
        .popup-content .form-group {
            flex: 1;
            position: relative;
        }
        .popup-content .form-group label {
            display: block;
            margin-bottom: 6px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.85rem;
        }
        .popup-content .form-group input,
        .popup-content .form-group select {
            width: 100%;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(0, 240, 255, 0.2);
            border-radius: 6px;
            color: white;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            margin-bottom: 2px;
            box-sizing: border-box;
        }
        .popup-content .form-group select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            padding-right: 35px;
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 14px;
        }
        .popup-content .form-group select option {
            background: rgba(10, 10, 26, 0.95);
            color: white;
            padding: 8px;
        }
        .popup-content .form-group input:focus,
        .popup-content .form-group select:focus {
            outline: none;
            border-color: #00f0ff;
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }
        .popup-content .submit-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(45deg, #00f0ff, #b400ff);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        .popup-content .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
        }
        .popup-content .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        .popup-content .error-highlight {
            border-color: #ff3860 !important;
            box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25) !important;
        }
        .popup-content .error-message {
            color: #ff3860;
            font-size: 0.75em;
            margin-top: 0.2em;
            height: 0.8em;
        }
        @media (max-width: 768px) {
            .popup-content { padding: 30px 20px; }
            .popup-content .form-row { flex-direction: column; gap: 15px; margin-bottom: 20px; }
            .popup-content h2 { font-size: 1.5rem; margin-bottom: 20px; }
            .popup-content .form-group label { margin-bottom: 8px; }
            .popup-content .form-group input, .popup-content .form-group select { padding: 10px; font-size: 0.95rem; }
            .popup-content .form-group select { background-position: right 10px center; background-size: 14px; padding-right: 35px; }
            .popup-content .submit-btn { padding: 12px; font-size: 1rem; }
        }
        @media (max-width: 480px) {
            .popup-content { padding: 20px 15px; }
            .popup-content h2 { font-size: 1.3rem; }
            .popup-content .form-group label { font-size: 0.85rem; }
            .popup-content .form-group input, .popup-content .form-group select { padding: 8px; font-size: 0.9rem; }
            .popup-content .form-group select { background-position: right 8px center; background-size: 12px; padding-right: 30px; }
            .popup-content .submit-btn { padding: 10px; font-size: 0.95rem; }
        }
        /* Snackbar */
.snackbar {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: rgba(10, 10, 26, 0.95);
    color: #fff;
    padding: 14px 24px;
    border-radius: 8px;
    border: 1px solid rgba(0, 240, 255, 0.2);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    font-size: 0.9rem;
    opacity: 0;
    transition: all 0.4s ease;
    z-index: 10000;
}
.snackbar.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
.snackbar.error {
    border-color: #ff3860;
}
.snackbar.success {
    border-color: #00f0ff;
}
    `;
    document.head.appendChild(style);
    function showSnackbar(message, type = 'error') {
        let snackbar = document.getElementById('snackbar');

        if (!snackbar) {
            snackbar = document.createElement('div');
            snackbar.id = 'snackbar';
            snackbar.className = 'snackbar';
            document.body.appendChild(snackbar);
        }

        snackbar.textContent = message;
        snackbar.className = `snackbar show ${type}`;

        setTimeout(() => {
            snackbar.classList.remove('show');
        }, 3000);
    }
    // Function to close popup
    function closePopupForm() {
        if (popupForm) {
            popupForm.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Clear all field errors on close
            ['firstName', 'lastName', 'phone', 'email', 'company', 'city', 'budget', 'timeline'].forEach(function (id) {
                clearFieldError(id);
            });
        }
    }

    // Function to open popup (expose globally)
    window.openPopupForm = function () {
        if (popupForm) {
            popupForm.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    // Close popup when close button is clicked
    if (closePopup) {
        closePopup.addEventListener('click', closePopupForm);
    }

    // Close popup when clicking outside the form
    if (popupForm) {
        popupForm.addEventListener('click', function (e) {
            if (e.target === popupForm) {
                closePopupForm();
            }
        });
    }

    // Phone number validation
    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[- ]/g, ''));
    }

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show inline field error
    function setFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (field) field.classList.add('error-highlight');
        if (errorEl) errorEl.textContent = message;
    }

    // Clear inline field error
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (field) field.classList.remove('error-highlight');
        if (errorEl) errorEl.textContent = '';
    }

    // Clear errors on input/change
    const fieldIds = ['firstName', 'lastName', 'phone', 'email', 'company', 'city', 'budget', 'timeline'];
    if (contactForm) {
        fieldIds.forEach(function (id) {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function () { clearFieldError(id); });
                el.addEventListener('change', function () { clearFieldError(id); });
            }
        });
    }

    // Validate all fields, return true if valid
    function validateForm(data) {
        let valid = true;

        if (!data.firstName.trim()) {
            setFieldError('firstName', 'First name is required');
            valid = false;
        } else {
            clearFieldError('firstName');
        }

        if (!data.lastName.trim()) {
            setFieldError('lastName', 'Last name is required');
            valid = false;
        } else {
            clearFieldError('lastName');
        }

        if (!data.phone.trim()) {
            setFieldError('phone', 'Phone number is required');
            valid = false;
        } else if (!validatePhone(data.phone)) {
            setFieldError('phone', 'Enter a valid 10-digit phone number');
            valid = false;
        } else {
            clearFieldError('phone');
        }

        if (!data.email.trim()) {
            setFieldError('email', 'Email is required');
            valid = false;
        } else if (!validateEmail(data.email)) {
            setFieldError('email', 'Enter a valid email address');
            valid = false;
        } else {
            clearFieldError('email');
        }

        if (!data.company.trim()) {
            setFieldError('company', 'Company name is required');
            valid = false;
        } else {
            clearFieldError('company');
        }

        if (!data.city.trim()) {
            setFieldError('city', 'City is required');
            valid = false;
        } else {
            clearFieldError('city');
        }

        if (!data.budget) {
            setFieldError('budget', 'Please select a budget');
            valid = false;
        } else {
            clearFieldError('budget');
        }

        if (!data.timeline) {
            setFieldError('timeline', 'Please select a timeline');
            valid = false;
        } else {
            clearFieldError('timeline');
        }

        return valid;
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                city: formData.get('city'),
                budget: formData.get('budget'),
                timeline: formData.get('timeline')
            };

            // Validate all fields
            if (!validateForm(data)) {
                return;
            }

            try {
                const submitButton = contactForm.querySelector('.submit-btn');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                }

                const response = await fetch("https://script.google.com/macros/s/AKfycbz_cjANWUIPQC8WZngreq9f6h80AQaEhgEQbuQ9F2W9cW4yszCw-q1yAh6NBwYAnHwLlg/exec", {
                    method: 'POST',
                    body: formData
                });

                const resultData = await response.json();

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }

                if (resultData.result === "success") {
                    contactForm.reset();
                    closePopupForm();
                    // Redirect based on budget
                    if (data.budget === "Less than 1 Lakh" || data.budget === "1 Lakh to 3 Lakhs") {
                        window.location.href = 'thank-you2.html';
                    } else {
                        window.location.href = 'thank-you.html';
                    }
                } else {
                    showSnackbar('Submission failed. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showSnackbar('There was an error submitting the form. Please try again.');
                const submitButton = contactForm.querySelector('.submit-btn');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
            }
        });
    }

    // Add keyboard support for closing popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popupForm && popupForm.classList.contains('active')) {
            closePopupForm();
        }
    });

    // Format phone number as user types
    if (contactForm) {
        const phoneInput = contactForm.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {

            });
        }
    }
}); 