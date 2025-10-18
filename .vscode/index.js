const { select , input , checkbox} = require ('@inquirer/prompts')

let fazer = {
    value: 'Tomar 3 litros de agua todos os dias.',
    checked: false
}

let metas = [fazer]

const cadastraMeta = async () =>{
    const fazer = await input ({ message: 'Digite a meta:'})

    if(fazer.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: fazer , checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas] , 
        instructions : false
    })

    if(respostas.length ==0) {
        console.log('Nenhuma meta selecionada.')
        return
    }
     
    metas.forEach((m) => {
    m.checked = false
    })

    respostas.forEach((resposta) => {
        const fazer = metas.find((m) => {
            return m.value == resposta
        })

        fazer.checked = true
    })
    console.log('Meta(s) concluida(s).')
}

const start = async () => {
    
           while (true){

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
                        name: 'Sair',
                        value: 'sair'
                    }
                ]
             })

            
                 switch (opcao) {
                    case 'cadastrar':
                        await cadastraMeta()
                        console.log(metas)
                        break
                    case 'listar':
                        await listarMetas()
                        break
                    case 'sair':
                        console.log('Até logo')
                        return

        }
    }        
}


start()