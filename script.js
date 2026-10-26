// Base de dados completa da Confeitaria Flor de Liz
const dadosSistema = {
    doces: [
        {
            categoria: "Doces - Cento R$ 95,00 (R$ 0,95 un)",
            precoCento: 95.00,
            itens: ["Beijinho", "Leite em Pó", "Bicho de Pé", "Brigadeiro Branco", "Brigadeiro de Limão", "Cajuzinho"]
        },
        {
            categoria: "Doces - Cento R$ 120,00 (R$ 1,20 un)",
            precoCento: 120.00,
            itens: ["Ouriço", "Churros", "Brigadeiro de Paçoca", "Olho de Sogra", "Brigadeiro", "Casadinho", "Leite em Pó com Nutella", "Leite em Pó com Doce de Leite"]
        },
        {
            categoria: "Doces - Cento R$ 140,00 (R$ 1,40 un)",
            precoCento: 140.00,
            itens: ["Prestígio", "Capuccino", "Bombom de Amendoim", "Bombom de Uva", "Bombom de Limão"]
        },
        {
            categoria: "Doces - Cento R$ 180,00 (R$ 1,80 un)",
            precoCento: 180.00,
            itens: ["Bombom de Cereja", "Bombom de Nozes", "Bombom Meio Amargo", "Bombom de Maracujá (Especial)"]
        },
        {
            categoria: "Doces - Cento R$ 220,00 (R$ 2,20 un)",
            precoCento: 220.00,
            itens: ["Bombom de Oreo", "Bombom de Maracujá", "Bombom de Abacaxi com Coco", "Brigadeiro com Confete", "Bombom de Cacau com Avelã"]
        }
    ],
    bolos: [
        {
            categoria: "1. Escolha o Tamanho do Bolo (Fatias)",
            tipo: "quantidade",
            itens: ["Bolo 10 Fatias", "Bolo 20 Fatias", "Bolo 40 Fatias", "Bolo 60 Fatias", "Bolo 80 Fatias", "Bolo 120 Fatias"],
            valoresFixos: [60.00, 110.00, 215.00, 280.00, 360.00, 540.00]
        },
        {
            categoria: "2. Escolha a Massa (Sem custo adicional)",
            tipo: "massa",
            itens: ["Massa Branca", "Massa de Chocolate", "Massa de Cenoura", "Massa de Limão", "Massa de Laranja", "Massa de Baunilha"]
        },
        {
            categoria: "3. Escolha os Recheios (Sem custo adicional)",
            tipo: "recheio",
            itens: [
                "Brigadeiro Tradicional", "Brigadeiro Branco", "Beijinho de Coco", 
                "Leite em Pó", "Amendoim", "Limão", "Café", "Sensação", "Doce de Leite"
            ]
        },
        {
            categoria: "4. Extras e Adicionais",
            tipo: "quantidade",
            itens: [
                "Extra: Cobertura de Chocolate", "Extra: Morangos", "Extra: Abacaxi", 
                "Extra: Doces na Unidade (cada)", "Extra: Recheio Especial (Nozes / Meio Amargo)"
            ],
            valoresFixos: [10.00, 10.00, 10.00, 1.50, 15.00]
        }
    ],
    salgados: [
        {
            categoria: "Salgados - Cento R$ 95,00 (R$ 0,95 un)",
            precoCento: 95.00,
            itens: ["Coxinha de Frango", "Quibe", "Enrolado de Salsicha", "Creme de Milho", "Cigarrete"]
        },
        {
            categoria: "Salgados - Cento R$ 120,00 (R$ 1,20 un)",
            precoCento: 120.00,
            itens: ["Bolinha de Queijo"]
        }
    ]
};

let textoWhatsappGlobal = "";

function carregarSecao(tipoAba) {
    const conteiner = document.getElementById('listaProdutos');
    if (!conteiner) return;
    conteiner.innerHTML = '';
    
    const categorias = dadosSistema[tipoAba];
    let idItem = 0;

    categorias.forEach(cat => {
        const tituloCat = document.createElement('h3');
        tituloCat.className = 'categoria-titulo';
        tituloCat.innerText = cat.categoria;
        conteiner.appendChild(tituloCat);

        cat.itens.forEach((nomeItem, index) => {
            idItem++;
            const div = document.createElement('div');

            if (tipoAba === 'bolos' && (cat.tipo === 'massa' || cat.tipo === 'recheio')) {
                const chaveCheck = `check_${tipoAba}_${cat.tipo}_${idItem}`;
                const checkedSalvo = localStorage.getItem(chaveCheck) === 'true' ? 'checked' : '';

                div.className = 'item-checkbox';
                div.innerHTML = `
                    <input type="checkbox" id="${chaveCheck}" ${checkedSalvo} onchange="salvarCheck('${chaveCheck}', this.checked)">
                    <span>${nomeItem}</span>
                `;
            } else {
                let precoUnitario = 0;
                if (tipoAba === 'bolos') {
                    precoUnitario = cat.valoresFixos[index];
                } else {
                    precoUnitario = cat.precoCento / 100;
                }

                const qtdSalva = localStorage.getItem(`${tipoAba}_${idItem}`) || "";

                div.className = 'item-doce';
                div.innerHTML = `
                    <div class="info-doce">
                        <span class="nome-doce">${nomeItem}</span>
                        <span class="preco-unitario">R$ ${precoUnitario.toFixed(2)} / un</span>
                    </div>
                    <input type="number" id="qtd_${tipoAba}_${idItem}" value="${qtdSalva}" placeholder="Qtd" min="0" data-tipo="${tipoAba}" data-nome="${nomeItem}" data-unitario="${precoUnitario}">
                `;
            }
            conteiner.appendChild(div);
        });
    });

    // Carrega dados salvos do cliente e tema
    const campoNome = document.getElementById('nomeCliente');
    const campoData = document.getElementById('dataEvento');
    const campoTema = document.getElementById('temaBolo');

    if (campoNome) campoNome.value = localStorage.getItem('cliente_nome') || "";
    if (campoData) campoData.value = localStorage.getItem('cliente_data') || "";
    if (campoTema) campoTema.value = localStorage.getItem('cliente_tema') || "";
}

function salvarCheck(chave, isChecked) {
    localStorage.setItem(chave, isChecked);
}

function salvarDadosDigitados() {
    const campoNome = document.getElementById('nomeCliente');
    const campoData = document.getElementById('dataEvento');
    const campoTema = document.getElementById('temaBolo');

    if (campoNome) localStorage.setItem('cliente_nome', campoNome.value);
    if (campoData) localStorage.setItem('cliente_data', campoData.value);
    if (campoTema) localStorage.setItem('cliente_tema', campoTema.value);

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        if (input.id.startsWith('qtd_')) {
            localStorage.setItem(input.id.replace('qtd_', ''), input.value);
        }
    });
}

function calcularOrcamentoGeral() {
    salvarDadosDigitados();

    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const dataEventoRaw = document.getElementById('dataEvento').value;
    const temaBolo = document.getElementById('temaBolo') ? document.getElementById('temaBolo').value.trim() : "";
    
    let totalGeral = 0;
    let selecionouAlgum = false;
    let itensResumoHtml = "";

    let dataFormatada = "";
    if (dataEventoRaw) {
        const partes = dataEventoRaw.split('-');
        dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    let tituloTexto = "Resumo do Orçamento Geral";
    if (nomeCliente && dataFormatada) {
        tituloTexto = `Orçamento para ${nomeCliente} (Data: ${dataFormatada})`;
    } else if (nomeCliente) {
        tituloTexto = `Orçamento para ${nomeCliente}`;
    } else if (dataFormatada) {
        tituloTexto = `Orçamento para o dia ${dataFormatada}`;
    }

    document.getElementById('cabecalhoResultado').innerText = tituloTexto;

    let itensDoces = "";
    let bolosPrincipais = "";
    let extrasBolos = "";
    let massasSelecionadas = [];
    let recheiosSelecionados = [];
    let itensSalgados = "";

    // 1. Processar Doces
    let idDoces = 0;
    dadosSistema.doces.forEach(cat => {
        cat.itens.forEach(nomeItem => {
            idDoces++;
            const qtdVal = parseInt(localStorage.getItem(`doces_${idDoces}`));
            if (qtdVal > 0) {
                selecionouAlgum = true;
                let unitario = cat.precoCento / 100;
                let subtotal = qtdVal * unitario;
                totalGeral += subtotal;

                itensResumoHtml += `<div class="item-resumo"><span>${qtdVal}x ${nomeItem}</span><span><strong>R$ ${subtotal.toFixed(2)}</strong></span></div>`;
                itensDoces += `• ${qtdVal}x ${nomeItem} - R$ ${subtotal.toFixed(2)}\n`;
            }
        });
    });

    // 2. Processar Bolos (Separando principal, massas, recheios, tema e extras)
    let idBolos = 0;
    dadosSistema.bolos.forEach((cat, indexCat) => {
        cat.itens.forEach((nomeItem, index) => {
            idBolos++;
            if (cat.tipo === 'massa') {
                if (localStorage.getItem(`check_bolos_massa_${idBolos}`) === 'true') {
                    massasSelecionadas.push(nomeItem);
                    selecionouAlgum = true;
                }
            } else if (cat.tipo === 'recheio') {
                if (localStorage.getItem(`check_bolos_recheio_${idBolos}`) === 'true') {
                    recheiosSelecionados.push(nomeItem);
                    selecionouAlgum = true;
                }
            } else {
                const qtdVal = parseInt(localStorage.getItem(`bolos_${idBolos}`));
                if (qtdVal > 0) {
                    selecionouAlgum = true;
                    let unitario = cat.valoresFixos[index];
                    let subtotal = qtdVal * unitario;
                    totalGeral += subtotal;

                    itensResumoHtml += `<div class="item-resumo"><span>${qtdVal}x ${nomeItem}</span><span><strong>R$ ${subtotal.toFixed(2)}</strong></span></div>`;
                    
                    // Se for categoria 0 (Tamanho do bolo), vai pro topo do bolo. Se for categoria 3 (Extras), vai para baixo dos extras.
                    if (indexCat === 3) {
                        extrasBolos += `• ${qtdVal}x ${nomeItem} - R$ ${subtotal.toFixed(2)}\n`;
                    } else {
                        bolosPrincipais += `• ${qtdVal}x ${nomeItem} - R$ ${subtotal.toFixed(2)}\n`;
                    }
                }
            }
        });
    });

    // Montando o bloco de bolos com a ordem exata solicitada
    let itensBolosCompleto = "";
    if (bolosPrincipais) {
        itensBolosCompleto += bolosPrincipais;
        if (massasSelecionadas.length > 0) {
            itensBolosCompleto += `  - Massa: ${massasSelecionadas.join(', ')}\n`;
            itensResumoHtml += `<div class="item-resumo"><span><em>Massa: ${massasSelecionadas.join(', ')}</em></span><span></span></div>`;
        }
        if (recheiosSelecionados.length > 0) {
            itensBolosCompleto += `  - Recheios: ${recheiosSelecionados.join(', ')}\n`;
            itensResumoHtml += `<div class="item-resumo"><span><em>Recheios: ${recheiosSelecionados.join(', ')}</em></span><span></span></div>`;
        }
        if (temaBolo) {
            itensBolosCompleto += `  - Obs / Tema: ${temaBolo}\n`;
            itensResumoHtml += `<div class="item-resumo"><span><em>Obs/Tema: ${temaBolo}</em></span><span></span></div>`;
        }
    }
    if (extrasBolos) {
        itensBolosCompleto += extrasBolos;
    }

    // 3. Processar Salgados
    let idSalgados = 0;
    dadosSistema.salgados.forEach(cat => {
        cat.itens.forEach(nomeItem => {
            idSalgados++;
            const qtdVal = parseInt(localStorage.getItem(`salgados_${idSalgados}`));
            if (qtdVal > 0) {
                selecionouAlgum = true;
                let unitario = cat.precoCento / 100;
                let subtotal = qtdVal * unitario;
                totalGeral += subtotal;

                itensResumoHtml += `<div class="item-resumo"><span>${qtdVal}x ${nomeItem}</span><span><strong>R$ ${subtotal.toFixed(2)}</strong></span></div>`;
                itensSalgados += `• ${qtdVal}x ${nomeItem} - R$ ${subtotal.toFixed(2)}\n`;
            }
        });
    });

    if (!selecionouAlgum) {
        alert('Por favor, selecione ou preencha pelo menos um item.');
        return;
    }

    // Montagem final da mensagem organizada para o WhatsApp
    textoWhatsappGlobal = `🧁 *Flor de Liz - Confeitaria*\n`;
    textoWhatsappGlobal += `📋 *${tituloTexto}*\n\n`;

    if (itensDoces) textoWhatsappGlobal += `🍬 *Doces:*\n${itensDoces}\n`;
    if (itensBolosCompleto) textoWhatsappGlobal += `🎂 *Bolos:*\n${itensBolosCompleto}\n`;
    if (itensSalgados) textoWhatsappGlobal += `🥟 *Salgados:*\n${itensSalgados}\n`;

    textoWhatsappGlobal += `💰 *Total Geral: R$ ${totalGeral.toFixed(2)}*`;

    document.getElementById('itensSelecionados').innerHTML = itensResumoHtml;
    document.getElementById('valorTotalGeral').innerText = totalGeral.toFixed(2);
    document.getElementById('resultado').classList.remove('hidden');
}

function copiarMensagemWhatsApp() {
    navigator.clipboard.writeText(textoWhatsappGlobal).then(() => {
        const btn = document.getElementById('btnCopiar');
        btn.innerText = "✅ Mensagem Copiada!";
        setTimeout(() => {
            btn.innerText = "📋 Copiar Mensagem p/ WhatsApp";
        }, 2500);
    }).catch(err => {
        alert('Erro ao copiar a mensagem.');
    });
}