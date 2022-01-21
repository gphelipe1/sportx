// eslint-disable-next-line import/no-anonymous-default-export
export default {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    download: true,
    viewColumns: false,
    search: true,
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
    page: 0,
    textLabels: {
      body: {
        noMatch: 'Nenhum dado encontrado!',
        toolTip: 'Ordenar'
      },
      pagination: {
        next: 'Próxima página',
        previous: 'Página anterior',
        rowsPerPage: 'Dados por página:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Procurar',
        filterTable: 'Filtrar',
        print: 'Imprimir'
      },
      filter: {
        all: 'Todos',
        title: 'FILTROS',
        reset: 'RESETAR',
      },
      selectedRows: {
        text: 'Linha(s) selecionada(s)',
        delete: 'Deletar',
        deleteAria: 'Deletar linha(s) selecionada(s)',
      },
    }
  };
  