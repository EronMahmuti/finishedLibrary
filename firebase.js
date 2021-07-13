

var firebaseConfig = {
    apiKey: "AIzaSyAwPhhq7TDEiVPypan2lPSELLvu6lOFSr0",
    authDomain: "libraryproject-572b6.firebaseapp.com",
    databaseURL: "https://libraryproject-572b6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "libraryproject-572b6",
    storageBucket: "libraryproject-572b6.appspot.com",
    messagingSenderId: "232676538776",
    appId: "1:232676538776:web:da79d642a7fc0a8d9993ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true})

const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let cross = document.createElement('button');
    
    li.className = "list-gr";
    name.className = "changeCss";
    author.className = "changeCss";
    pages.className = "changeCss pags";
    cross.className = "deleteBtn"

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name;
    author.textContent = doc.data().author;
    pages.textContent = doc.data().pages;
    cross.textContent = 'delete';

    li.appendChild(name);
    li.appendChild(author);
    li.appendChild(pages);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data 
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

//getting data

// db.collection('cafes').orderBy('name').get().then((snapshot) => {
//     console.log(snapshot.docs)
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// });

//saving data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.name.value == '' | form.author.value == '' | form.pages.value == ''){
        alert("please fill all the input fields")
    }else{
        
        db.collection('cafes').add({
            name: form.name.value,
            author: form.author.value,
            pages: form.pages.value
        })
        form.name.value = '';
        form.author.value = '';
        form.pages.value = '';
    }
})

// real time listener

db.collection('cafes').orderBy('author').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data());
        if(change.type == "added"){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
    console.log(changes);
});




