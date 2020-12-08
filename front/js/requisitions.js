function sendRequest(URL, params, type) {
    const request = new XMLHttpRequest();
    request.open('POST', URL, true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            if (type === 'login') {
                console.log(`logado como: ${request.responseText}`);
                const responseJson = JSON.parse(request.responseText);
                if (responseJson.status === 'ok') {
                    window.location.replace("http://localhost/ourspace/front/Feed.html");
                } else {
                    alert('Senha ou email incorrentos');
                }
            }
            if (type === 'loadFeed') {
                const posts = JSON.parse(request.responseText);
                
                if (posts.status) {
                    if (posts.status === 'offline')
                        window.location.replace("http://localhost/ourspace/front/login.html");
                    else if (posts.status === 0)
                        alert('Não há publicações no momento!');
                } else {
                    console.log(posts);
                    for (i = 0; i < posts.length; i++) { 
                        createBalloon(posts, i);
                    }
                }
            }
            if (type === 'updatePost') {
                console.log(`logado como: ${request.responseText}`);
                window.location.replace("http://localhost/ourspace/front/Feed.html");
            }
            if (type === 'sendPost') {
                const responseJson = JSON.parse(request.responseText);
                if (responseJson.status === 'ok') {
                    location.reload();
                } else {
                    alert('Problema ao publicar! -> '+responseJson.status);
                }
            }
            if (type === 'deletePost') {
                console.log(`logado como: ${request.responseText}`);
                window.location.replace("http://localhost/ourspace/front/Feed.html");
            }
            if (type === 'register'){
                const responseJson = JSON.parse(request.responseText);
                if (responseJson.status === 'ok') {
                    window.location.replace("http://localhost/ourspace/front/login.html");
                } else {
                    alert('Email já existe');
                }
                
            }
        }
    }
    if (params === '') {
        request.send();
    } else {
        request.send(params);
    }
}

function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    if (email != '' && pass != '')
        sendRequest('http://localhost/ourspace/php/login.php', `email=${email}&senha=${pass}`, 'login');
    else
        alert('Preencha todos os campos!');
}

function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('senha').value;
    const name = document.getElementById('name').value;
    const midlename = document.getElementById('midleName').value;
    const birthday = document.getElementById('birthday').value;

    if (email != '' && pass != '' && midlename != '' && name != '' && birthday != '')
        sendRequest('http://localhost/ourspace/php/register.php', `email=${email}&senha=${pass}&midleName=${midlename}&name=${name}&birthday=${birthday}`, 'register');
    else
        alert('Preencha todos os campos!');

}

function loadFeed() {
    sendRequest('http://localhost/ourspace/php/loadFeed.php', ``, 'loadFeed');
}

function updatePost() {
    
}

function sendPost() {
    const text = document.getElementById('text').value;
    if (text != '') {
        sendRequest('http://localhost/ourspace/php/publish.php', `text=${text}`, 'sendPost');    
    } else {
        alert('Não é possível publicar texto em branco!');
    }
}

function deletePost() {

}

function createBalloon(posts, index) {
    const messages_container = document.getElementById('messages-container');
    
    const message = document.createElement('div');
    message.id = 'message';
    message.className = 'message';

    const header = document.createElement('div');
    header.id = 'header';
    header.className = 'header';

    const p_name = document.createElement('p');
    p_name.id = 'name';
    p_name.className = 'name';

    const p_timestamp = document.createElement('p');
    p_timestamp.id = 'timestamp';
    p_timestamp.className = 'timestamp';
    
    const message_content = document.createElement('div');
    message_content.id = 'message-content';
    message_content.className = 'message-content';
    
    const p_txt = document.createElement('p');
    p_txt.id = 'txt';

    messages_container.appendChild(message);
    message.appendChild(header);
    header.appendChild(p_name);
    header.appendChild(p_timestamp);
    message.appendChild(message_content);
    message_content.appendChild(p_txt);

    const name = posts[index].name;
    const text = posts[index].text;
    const timestamp = posts[index].timeNow;

    p_name.innerHTML = name;
    p_timestamp.innerHTML = timestamp;
    p_txt.innerHTML = text;
}