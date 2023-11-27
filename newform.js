
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
    axios.post('https://crudcrud.com/api/a18ba1468e0b40ebbf3a0b06ccceb085/appointmentData', my_obj)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    
    my_objSerialized = JSON.stringify(my_obj);
    localStorage.setItem(email, my_objSerialized);
    showOutput(my_obj);
    document.getElementById('username').value = null;
    document.getElementById('useremail').value = null;
    document.getElementById('userphone').value = null;
 }

 function showOutput(userDetails){
    const li = document.createElement('li')
    let details = userDetails.name + '-' + userDetails.email + '-' + userDetails.phone
   
    const deleteBtn = document.createElement('input')
    const editBtn = document.createElement('input')

    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete'

    editBtn.type = 'button';
    editBtn.value = 'Edit';
    editBtn.style.width = 30

    if(userDetails.name != ''){
    li.innerText = details;
    var ul = document.getElementById('user-list');
    ul.appendChild(li);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    }
    
    

    deleteBtn.addEventListener('click', removeData);
    function removeData(e){
        e.preventDefault();
        deleteBtn.parentElement.innerText = ' ';
        li.style.listStyle='none';
        // localStorage.removeItem(email);
        let id = userDetails._id
        axios.delete(`https://crudcrud.com/api/a18ba1468e0b40ebbf3a0b06ccceb085/appointmentData/${id}` )
        .then(res => console.log(res))
        .catch(err => console.log(err))
    };

    editBtn.addEventListener('click', editData);
    function editData(e){
        e.preventDefault();
        let id = userDetails._id
        // axios.put(`https://crudcrud.com/api/a18ba1468e0b40ebbf3a0b06ccceb085/appointmentData/${id}`,
        // {
        //     'name': document.getElementById('username').value,
        //     'email':document.getElementById('useremail').value ,
        //     'phone':document.getElementById('userphone').value
        // }
        // ).then(res => console.log(res)).catch(err => console.log(err))
        document.getElementById('username').value = userDetails.name;
        document.getElementById('useremail').value = userDetails.email;
        document.getElementById('userphone').value = userDetails.phone;
        editBtn.parentElement.innerText = ' ';
        li.style.listStyle='none';
        // localStorage.removeItem(email);
    };


 
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/a18ba1468e0b40ebbf3a0b06ccceb085/appointmentData')
    .then(res => {console.log(res.data)
    for(let i=0; i<res.data.length; i++){
        if(res.data[i] != null){
        showOutput(res.data[i])
        }
    }

    })
    .catch(err => console.log(err))
})