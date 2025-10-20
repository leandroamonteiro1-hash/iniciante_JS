const { select , input , checkbox} = require ('@inquirer/prompts')

let mensagem = 'Bem vindo ao app de Metas'

let fazer = {
    value: 'Tomar 3 litros de agua todos os dias.',
    checked: false
}

let metas = [fazer]

const cadastraMeta = async () =>{
    const fazer = await input ({ message: 'Digite a meta:'})

    if(fazer.length == 0) {
        mensagem = 'Nenhuma meta cadastrada.'
        return
    }

    metas.push(
        { value: fazer , checked: false })

        mensagem = 'Meta cadastrada com sucesso.'
}

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas] , 
        instructions : false
    })

    metas.forEach((m) => {
    m.checked = false
    })

    if(respostas.length ==0) {
        mensagem = 'Nenhuma meta selecionada.'
        return
    }
     
    respostas.forEach((resposta) => {
        const fazer = metas.find((m) => {
            return m.value == resposta
        })

        fazer.checked = true
    })

    mensagem = 'Meta(s) marcada como concluída(s).'
}

const metasRealizadas = async () =>{ 
    const realizadas = metas.filter ((fazer) =>{
        return  fazer.checked
    })
    
    if (realizadas.length == 0){
        mensagem = 'Não existe metas realizadas.'
        return 
    }

    await select ({
        message: 'Metas realizadas: ' + realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas = async ()  => {
    const abertas = metas.filter((fazer) =>{
        return fazer.checked != true
    })

    if (abertas.length == 0){
        mensagem = 'Não existe metas abertas.'
        return
    }

    await select ({
        message: 'Metas abertas: ' + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async() => {
    const metasDesmarcadas = metas.map ((fazer) =>{
        return {value: fazer.value, checked: false}
    })

    const itensADeletar = await checkbox ({
        message: 'Selecione item para deletar.',
        choices: [...metasDesmarcadas] , 
        instructions : false
    })

    if (itensADeletar.length ==0){
        mensagem = 'Nenhum item foi deletado.'
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((fazer) => {
            return fazer.value != item
        })
    })

    mensagem = 'Meta(s) deletada(s) com sucesso.'
}

const mostrarMensagens = () => {
    console.clear () 

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem =""
    }
}

const start = async () => {
    
           while (true){
            mostrarMensagens()

            const opcao = await select({ 
                message: 'Menu >',
                choices: [
                    {
                        name: 'Cadastrar metas',
                        value: 'cadastrar'
                    },
                    {
                        name: 'Listar metas',
                        value: 'listar'
                    },
                    {
                        name: 'Metas realizadas',
                        value: 'realizadas'
                    },
                    {
                        name: 'Metas abertas',
                        value: 'abertas'
                    },
                    {
                        name: 'Deletar metas',
                        value: 'deletar'
                    },
                    {
                        name: 'Sair',
                        value: 'sair'
                    }
                ]
             })

            
                 switch (opcao) {
                    case 'cadastrar':
                        await cadastraMeta()
                        break
                    case 'listar':
                        await listarMetas()
                        break
                    case 'realizadas':
                        await metasRealizadas()
                        break                    
                    case 'abertas':
                        await metasAbertas()
                        break
                    case 'deletar':
                        await deletarMetas()
                        break
                    case 'sair':
                        console.log('Até logo')
                        return

        } 
    }        
}


start()