//------------------ALL-USERS--------------------------------

function getUsers() {

    fetch("http://localhost:8080/rest/users")
        .then((res) => res.json())
        .then((data) => {
            let temp = "";
            data.forEach(function (user) {

                temp += `
                <tr>
                <td id="id${user.id}">${user.id}</td>
                <td id="username${user.id}">${user.username}</td> 
                <td id="lastname${user.id}">${user.lastname}</td>
                <td id="age${user.id}">${user.age}</td>
                <td id="email${user.id}">${user.email}</td>
                <td id="roles${user.id}">${user.roles.map(r => r.role.replace('ROLE_','')).join(', ')}</td>
                <td>
                <button class="btn btn-info btn-md" type="button"
                data-toggle="modal" data-target="#editModal" 
                onclick="fillModal(${user.id})">Edit</button></td>
                <td>
                <button class="btn btn-danger btn-md" type="button"
                data-toggle="modal" data-target="#deleteModal" 
                onclick="fillModal(${user.id})">Delete</button></td>
              </tr>`;
            });
            document.getElementById("usersTable").innerHTML = temp;
        })
}
getUsers()

//------------------fillModals--------------------------------

function fillModal(id) {
    fetch("http://localhost:8080/rest/findUser/" + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('id').value = user.id;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editLastname').value = user.lastname;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = user.password;

            document.getElementById('delId').value = user.id;
            document.getElementById('delUsername').value = user.username;
            document.getElementById('delLastname').value = user.lastname;
            document.getElementById('delAge').value = user.age;
            document.getElementById('delEmail').value = user.email;
            document.getElementById('delPassword').value = user.password;
        })
    });
}

//------------------SHOW-User--------------------------------

function showUser() {
    //$("#topNav").css("display", "none");
    const showUserURL = 'http://localhost:8080/rest/infoUser';
    fetch(showUserURL)
        .then((res) => res.json())
        .then((user) => {

            let temp = "<tr>";
            temp += `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(r => r.role.replace('ROLE_','')).join(', ')}</td>
            `;
            temp += "<tr>";
            document.getElementById("userTable").innerHTML = temp;
        })
}
showUser();

//------------------NEW-USER--------------------------------

document.getElementById("newUserForm")
    .addEventListener("submit", newUserForm);

function newUserForm(e){
    e.preventDefault();

    let username = document.getElementById("addUsername").value;
    let lastname = document.getElementById("addLastname").value;
    let age = document.getElementById("addAge").value;
    let email = document.getElementById("addEmail").value;
    let password = document.getElementById("addPassword").value;
    let roles = selectRole(Array.from(document.getElementById("addRole").selectedOptions)
        .map(r => r.value));

    fetch("http://localhost:8080/rest/addUser", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            lastname: lastname,
            age: age,
            email: email,
            password: password,
            roles: roles
        })
    })
        .then(() => {
            document.getElementById("usersTab").click();
            getUsers();
            document.getElementById("newUserForm").reset();
        })
}

//------------------EDIT--------------------------------

function butEdit() {

    let user = {
        id: document.getElementById('id').value,
        username: document.getElementById('editUsername').value,
        lastname: document.getElementById('editLastname').value,
        age: document.getElementById('editAge').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value,
        roles: selectRole(Array.from(document.getElementById("editRole").selectedOptions)
            .map(r => r.value))
    }

    fetch("http://localhost:8080/rest/updateUser", {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    $("#editModal .close").click();
    reTable();
}

//------------------select-ROLE--------------------------------
function selectRole(r) {
    let roles = [];
    if (r.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    if (r.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    return roles;
}

//------------------DELETE--------------------------------

function butDelete() {
    fetch("http://localhost:8080/rest/deleteUser/" + document.getElementById('delId').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    $("#deleteModal .close").click();
    reTable();
}

//------------------reTable--------------------------------

function reTable() {
    let table = document.getElementById('usersTable')
    if (table.rows.length > 1) {
        table.deleteRow(1);
    }
    setTimeout(getUsers, 140)
}