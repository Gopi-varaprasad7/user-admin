
let users = localStorage.getItem('users', JSON.stringify('users')) || [];

window.addEventListener('DOMContentLoaded', () => {
    
    // Register Form Validation
 const regForm =  document.getElementById('reg-form');

    if(regForm){
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            let regName = document.getElementById('reg-name').value.trim();
            let regEmail = document.getElementById('reg-email').value.trim();
            let regNumber = document.getElementById('reg-number').value.trim();
            let regPassword = document.getElementById('reg-password').value.trim();
            let confirmPassword = document.getElementById('confirm-password').value.trim();
    
            // Clear previous error messages
            document.getElementById('name-error').style.display = 'none';
            document.getElementById('email-error').style.display = 'none';
            document.getElementById('password-error').style.display = 'none';
            document.getElementById('confirm-password-error').style.display = 'none';
    
            let isValid = true;
    
            // Validate name
            if (!regName) {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                document.getElementById('reg-name').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('reg-name').style.border = '';
            }
            
            // Validate email
            const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regEmail) {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                document.getElementById('reg-email').style.border = '1px solid red';
                isValid = false;
            } else if (!emailPattern.test(regEmail)) {
                document.getElementById('email-error').textContent = 'Invalid email format';
                document.getElementById('email-error').style.display = 'block';
                document.getElementById('reg-email').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('reg-email').style.border = '';
            }

            if(!regNumber){
                document.getElementById('number-error').textContent = 'Number is required';
                document.getElementById('number-error').style.display = 'block';
                document.getElementById('reg-number').style.border = '1px solid red';
                isValid = false;
            }
            else if(regNumber.length !== 10){
                document.getElementById('number-error').textContent = 'Invalid number format';
                document.getElementById('number-error').style.display = 'block';
                document.getElementById('reg-number').style.border = '1px solid red';
                isValid = false;
            }
            else{
                document.getElementById('reg-number').style.border = '';
            }
    
            // Validate password
            if (!regPassword) {
                document.getElementById('password-error').textContent = 'Password is required';
                document.getElementById('password-error').style.display = 'block';
                document.getElementById('reg-password').style.border = '1px solid red';
                isValid = false;
            } else if (regPassword.length < 8) {
                document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
                document.getElementById('password-error').style.display = 'block';
                document.getElementById('reg-password').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('reg-password').style.border = '';
            }
    
            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Please confirm your password';
                document.getElementById('confirm-password-error').style.display = 'block';
                document.getElementById('confirm-password').style.border = '1px solid red';
                isValid = false;
            } else if (regPassword !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
                document.getElementById('confirm-password-error').style.display = 'block';
                document.getElementById('confirm-password').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('confirm-password').style.border = '';
            }
    
            if (isValid) {
                alert('Registration successful!');
                userRegister(regName, regEmail, regPassword,regNumber);
                document.getElementById('reg-form').reset();
                window.location.href='login.html';
            }
        });
    }

});



const validateLogin = (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    let isValid = true;
    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        document.getElementById('email').style.border = '1px solid red';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email format';
        emailError.style.display = 'block';
        document.getElementById('email').style.border = '1px solid red';
        isValid = false;
    } else {
        document.getElementById('email').style.border = '';
    }

    // Validate password
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        document.getElementById('password').style.border = '1px solid red';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordError.style.display = 'block';
        document.getElementById('password').style.border = '1px solid red';
        isValid = false;
    } else {
        document.getElementById('password').style.border = '';
    }

    // Check if validation passed
    if (!isValid) {
        return;
    }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email and password match an existing user
        const findUser = users.find(user => user.email === email && user.pass === password);
        
        if (findUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(findUser));
            
            if (findUser.email.endsWith('@cvcorp.in')) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user.html';
            }
            document.getElementById('form').reset();
        } else {
            // If no match is found, alert the user to register
            alert('You are not registered. Please register.');
            document.getElementById('form').reset();
        }
    
};

window.addEventListener('DOMContentLoaded', () => {
    
    // Create Register Form Validation
    const createForm = document.getElementById('create-form');
    const addButton = document.getElementById('add-btn');
    const block = document.getElementById('block');

    // Toggle visibility of the registration form when "Add+" button is clicked
    if (addButton) {
        addButton.addEventListener('click', () => {
            block.classList.toggle('hidden');
        });
    }

    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            let regName = document.getElementById('create-name').value.trim();
            let regEmail = document.getElementById('create-email').value.trim();
            let regNumber = document.getElementById('create-number').value.trim();
            let regPassword = document.getElementById('create-password').value.trim();
            let confirmPassword = document.getElementById('confirm-password').value.trim();
    
            // Clear previous error messages
            document.getElementById('name-error').style.display = 'none';
            document.getElementById('email-error').style.display = 'none';
            document.getElementById('number-error').style.display = 'none';
            document.getElementById('password-error').style.display = 'none';
            document.getElementById('confirm-password-error').style.display = 'none';
    
            let isValid = true;
    
            // Validate name
            if (!regName) {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                document.getElementById('create-name').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('create-name').style.border = '';
            }
            
            // Validate email
            const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regEmail) {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                document.getElementById('create-email').style.border = '1px solid red';
                isValid = false;
            } else if (!emailPattern.test(regEmail)) {
                document.getElementById('email-error').textContent = 'Invalid email format';
                document.getElementById('email-error').style.display = 'block';
                document.getElementById('create-email').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('create-email').style.border = '';
            }

            // Validate phone number
            if (!regNumber) {
                document.getElementById('number-error').textContent = 'Number is required';
                document.getElementById('number-error').style.display = 'block';
                document.getElementById('create-number').style.border = '1px solid red';
                isValid = false;
            } else if (regNumber.length !== 10) {
                document.getElementById('number-error').textContent = 'Invalid number format';
                document.getElementById('number-error').style.display = 'block';
                document.getElementById('create-number').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('create-number').style.border = '';
            }
    
            // Validate password
            if (!regPassword) {
                document.getElementById('password-error').textContent = 'Password is required';
                document.getElementById('password-error').style.display = 'block';
                document.getElementById('create-password').style.border = '1px solid red';
                isValid = false;
            } else if (regPassword.length < 8) {
                document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
                document.getElementById('password-error').style.display = 'block';
                document.getElementById('create-password').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('create-password').style.border = '';
            }
    
            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Please confirm your password';
                document.getElementById('confirm-password-error').style.display = 'block';
                document.getElementById('confirm-password').style.border = '1px solid red';
                isValid = false;
            } else if (regPassword !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
                document.getElementById('confirm-password-error').style.display = 'block';
                document.getElementById('confirm-password').style.border = '1px solid red';
                isValid = false;
            } else {
                document.getElementById('confirm-password').style.border = '';
            }
    
            if (isValid) {
                alert('Registration successful!');
                userRegister(regName, regEmail, regPassword, regNumber);
                document.getElementById('create-form').reset();
            }
        });
    }
});


function userRegister(username, email, pass,number) {
    let users = JSON.parse(localStorage.getItem('users')) || []; 
    const isExistingUser = users.some((user) => user.email === email);
    if (isExistingUser) {
        alert('Email already registered!');
        return;
    }
    const newUser = {
        id: users.length + 1,
        name: username,
        email: email,
        number: number,
        pass: pass,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}



document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    function displayUser(userDetails) {
        const { id, name, email } = userDetails;

        const userId = document.getElementById('user-id');
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');

        // Check if elements exist before setting textContent
        if (userId) userId.textContent = id || 'N/A';
        if (userName) userName.textContent = name || 'N/A';
        if (userEmail) userEmail.textContent = email || 'N/A';
    }

    if (loggedInUser) {
        displayUser(loggedInUser);
    }


    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector('#user-table tbody');

    // Filter out admins
    const nonAdminUsers = users.filter(user => !user.email.endsWith('@cvcorp.in'));

    // Populate the table
    function populateTable(users) {
        tableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = user.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;

            const actionsCell = document.createElement('td');

            // Create Edit Button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            editButton.addEventListener('click', () => editUser(user));

            // Create Delete Button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.addEventListener('click', () => deleteUser(user.id));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        });
    }

    // Edit User Functionality
    function editUser(user) {
        const newName = prompt('Enter new name:', user.name);
        const newEmail = prompt('Enter new email:', user.email);

        if (newName && newEmail) {
            // Update user details in localStorage
            const updatedUsers = users.map(u => u.id === user.id ? { ...u, name: newName, email: newEmail } : u);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            alert('User updated successfully!');
            populateTable(updatedUsers.filter(u => !u.email.endsWith('@cvcorp.in')));
        }
    }

    // Delete User Functionality
    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter(user => user.id !== userId);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            alert('User deleted successfully!');
            populateTable(updatedUsers.filter(user => !user.email.endsWith('@cvcorp.in')));
        }
    }

    // Logout button functionality
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    populateTable(nonAdminUsers);
});


// const addButton = document.getElementById('add-btn');
// const block = document.getElementById('block');

// addButton.addEventListener('click', () => {
//     block.classList.toggle('hidden');
// });
