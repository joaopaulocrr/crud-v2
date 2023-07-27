const miniRedeSocial = {
    usuarios: [
        {
            username: 'joaopaulo'
        }
    ],
    posts: [
        {
            id: Date.now(),
            owner: 'joaopaulo',
            content: 'Meu primeiro tweet'
        }
    ],
    readPosts() {
        miniRedeSocial.posts.forEach(({ id, owner, content }) => {
            miniRedeSocial.criaPost({ id, owner: owner, content: content }, true)
        })
    },
    criaPost(dados, htmlOnly = false) {
        const idInternoAqui = Date.now()
        if (!htmlOnly) {
            //Cria Posts na memoria (array/objeto)
            miniRedeSocial.posts.push({
                id: dados.id || idInternoAqui,
                owner: dados.owner,
                content: dados.content
            })
        }

        //Cria post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts')
        $listaDePosts.insertAdjacentHTML('afterbegin', `
            <li data-id="${idInternoAqui}">
            <button class="btn-delete">x</button>
                <span contenteditable>
                    ${dados.content}
                <span>
               
            </li>
        `)
    },
    apagaPost(id) {
        const listaDePostsAtualizada = miniRedeSocial.posts.filter((postAtual) => {
            return postAtual.id !== Number(id)
        })
        console.log(listaDePostsAtualizada)
        miniRedeSocial.posts = listaDePostsAtualizada
    },
    atualizaContentDoPost(id, novoConteudo) {
        const postQueVaiSerAtualizado = miniRedeSocial.posts.find((post) => {
            return post.id === Number(id)
        })
        console.log(postQueVaiSerAtualizado)
        // postQueVaiSerAtualizado.content = novoConteudo
    }
}
   

//Código de front-end: web

const $meuForm = document.querySelector('form')
console.log($meuForm)


//READ -------------------------------------------------------------
miniRedeSocial.readPosts()

//CREATE -------------------------------------------------------
$meuForm.addEventListener('submit', (infosDoEvento) => {
    infosDoEvento.preventDefault()
    const $inputCriaPost = document.querySelector('input[name="criaPost"]')

    miniRedeSocial.criaPost({ owner: 'joaopaulo', content: $inputCriaPost.value })

    $inputCriaPost.value = ""

})

//DELETE -------------------------------------------------------------
document.querySelector('.listaDePosts').addEventListener('click', function (infosDoEvento) {
    const elementoAtual = infosDoEvento.target
    const isBtnDeleteClick = infosDoEvento.target.classList.contains('btn-delete')
    if (isBtnDeleteClick) {
        const id = elementoAtual.parentNode.getAttribute('data-id')
        miniRedeSocial.apagaPost(id)
        elementoAtual.parentNode.remove()

        console.log(miniRedeSocial.posts)
    }

})

//Update
document.querySelector('.listaDePosts').addEventListener('input', function (infosDoEvento) {
    const elementoAtual = infosDoEvento.target
    const id = elementoAtual.parentNode.getAttribute('data-id')
    console.log('ID: ', id)
    console.log('Valor: ',elementoAtual.innerText)
    miniRedeSocial.atualizaContentDoPost(id, elementoAtual.innerText)
})

