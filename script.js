const miniRedeSocial = {
    usuarios: [
        {
            username: 'joaopaulo'
        }
    ],
    posts: [
        {
            id: 1,
            owner: 'joaopaulo',
            content: 'Meu primeiro tweet'
        }
    ],
    criaPost(dados) {
        miniRedeSocial.posts.push({
            id: miniRedeSocial.posts.length + 1,
            owner: dados.owner,
            content:dados.content 
        })
        const $listaDePosts = document.querySelector('.listaDePosts')
        $listaDePosts.insertAdjacentHTML('afterbegin', `<li>${dados.content}</li>`)
    }
}

const $meuForm = document.querySelector('form')
const $inputCriaPost = document.querySelector('input[name="criaPost"]')

$meuForm.addEventListener('submit', (infosDoEvento) => {
    infosDoEvento.preventDefault()
    
    miniRedeSocial.criaPost({ owner: 'joaopaulo', content: $inputCriaPost.value })
    console.log(miniRedeSocial.posts)

    $inputCriaPost.value = ""
    
})

