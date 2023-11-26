

const form = document.getElementById('my-form');
form.addEventListener('submit', saveData);

function saveData(e){
    e.preventDefault();
    let name = document.querySelector('#username').value;
    let email = document.querySelector('#useremail').value;
    let phone = document.querySelector('#userphone').value;

    let my_obj = {
        "name": name,
        "email": email,
        "phone": phone
    
    };
    axios.post('https://crudcrud.com/api/6eef386a0af74e5baa92849d56744691/appointmentData', my_obj)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    
    my_objSerialized = JSON.stringify(my_obj);
    localStorage.setItem(email, my_objSerialized);

    let details = name+' - '+email+' - '+phone;
    const li = document.createElement('li')
    const deleteBtn = document.createElement('input')
    const editBtn = document.createElement('input')

    deleteBtn.type = 'button';
    deleteBtn.value = 'delete'

    editBtn.type = 'button';
    editBtn.value = 'edit';


    li.innerText = details;
    var ul = document.getElementById('user-list');
    ul.appendChild(li);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    deleteBtn.addEventListener('click', removeData);
    function removeData(e){
        e.preventDefault();
        deleteBtn.parentElement.innerText = ' ';
        li.style.listStyle='none';
        localStorage.removeItem(email);
    };

    editBtn.addEventListener('click', editData);
    function editData(e){
        e.preventDefault();
        document.getElementById('username').value = name;
        document.getElementById('useremail').value = email;
        document.getElementById('userphone').value = phone;
        editBtn.parentElement.innerText = ' ';
        li.style.listStyle='none';
        localStorage.removeItem(email);
    };

    document.getElementById('username').value = null;
    document.getElementById('useremail').value = null;
    document.getElementById('userphone').value = null;
 }

 window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/6eef386a0af74e5baa92849d56744691/appointmentData')
    .then(res => {console.log(res.data)
    for(let i=0; i< res.data.length; i++){
        const userData = Object.values(res.data[i])
        const li = document.createElement('li')
        li.innerText = userData[1]+'-'+ userData[2] +'-'+ userData[3];
        var ul = document.getElementById('user-list');
        ul.appendChild(li);


        let name = document.querySelector('#username').value;
        let email = document.querySelector('#useremail').value;
        let phone = document.querySelector('#userphone').value;
    
        const deleteBtn = document.createElement('input')
        const editBtn = document.createElement('input')
    
        deleteBtn.type = 'button';
        deleteBtn.value = 'delete'
    
        editBtn.type = 'button';
        editBtn.value = 'edit';
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
    
        deleteBtn.addEventListener('click', removeData);
        function removeData(e){
            e.preventDefault();
            deleteBtn.parentElement.innerText = ' ';
            li.style.listStyle='none';
            localStorage.removeItem(email);
        };
    
        editBtn.addEventListener('click', editData);
        function editData(e){
            e.preventDefault();
            document.getElementById('username').value = name;
            document.getElementById('useremail').value = email;
            document.getElementById('userphone').value = phone;
            editBtn.parentElement.innerText = ' ';
            li.style.listStyle='none';
            localStorage.removeItem(email);
        };

    }
    }
    )
    .catch(err => console.log(err))
    
    })
