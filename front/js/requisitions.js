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
                        createBalloon(posts, i, false, false);
                    }
                }
            }

            if (type === 'myPostsDel') {
                const posts = JSON.parse(request.responseText);
                
                if (posts.status) {
                    if (posts.status === 'offline')
                        window.location.replace("http://localhost/ourspace/front/login.html");
                    else if (posts.status === 0)
                        alert('Não há publicações no momento!');
                } else {
                    console.log(posts);
                    for (i = 0; i < posts.length; i++) { 
                        createBalloon(posts, i, true, false);
                    }
                }
            }

            if (type === 'myPostsUpdate') {
                const posts = JSON.parse(request.responseText);
                
                if (posts.status) {
                    if (posts.status === 'offline')
                        window.location.replace("http://localhost/ourspace/front/login.html");
                    else if (posts.status === 0)
                        alert('Não há publicações no momento!');
                } else {
                    console.log(posts);
                    for (i = 0; i < posts.length; i++) { 
                        createBalloon(posts, i, false, true);
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
                const responseJson = JSON.parse(request.responseText);
                if (responseJson.status === 'ok') {
                    console.log('Deletado!');                    
                } else {
                    alert('Problema ao deletar! -> '+responseJson.status);
                }
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

function loadMyPostsDel() {
    sendRequest('http://localhost/ourspace/php/myPosts.php', ``, 'myPostsDel');
}

function loadMyPostsUpdate() {
    sendRequest('http://localhost/ourspace/php/myPosts.php', ``, 'myPostsUpdate');
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
    var check = document.getElementsByName('mensagens'); 

    for (i = 0; i < check.length; i++){ 
        if (check[i].checked === true){ 
            var h = document.getElementById(String(i)+'p').innerHTML;
            console.log(h);
            sendRequest('http://localhost/ourspace/php/deletepost.php', `h=${h}`, 'deletePost');
        }
    }

    window.location.replace("http://localhost/ourspace/front/Feed.html");
}

function updatePost() {
    const text = document.getElementById('text').value;    
    var check = document.getElementsByName('mensagens'); 
    for (i = 0; i < check.length; i++){ 
        if (check[i].checked === true){ 
            var h = document.getElementById(String(i)+'p').innerHTML;
            console.log(h);
            sendRequest('http://localhost/ourspace/php/updatepost.php', `h=${h}&text=${text}`, 'updatePost');
            break;    
        }
    }
    window.location.replace("http://localhost/ourspace/front/Feed.html");
}

function createBalloon(posts, index, del, update) {
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
    if (del) {
        p_timestamp.id = String(index)+'p';
    } else if (update) {
        p_timestamp.id = String(index)+'p';
    }
    p_timestamp.className = 'timestamp';
    
    const message_content = document.createElement('div');
    message_content.id = 'message-content';
    message_content.className = 'message-content';
    
    const p_txt = document.createElement('p');
    p_txt.id = 'txt';

    messages_container.appendChild(message);
    message.appendChild(header);
    if (del) {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = String(index);
        input.name = 'mensagens';
        header.appendChild(input);
    } else if (update) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.value = p_timestamp.innerHTML;
        input.name = 'mensagens';
        input.id = String(index); 
        header.appendChild(input);
    }
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