export class AppConfig {

    static DATATABLE_LANGUAGE = "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json";
    static PAGE_SIZE = 20;
    static TABLE_PAGELENGTH_OPTIONS = [[5, 20, 50, 100], [5, 20, 50, 100]];

    // https://datatables.net/reference/option/dom
    static TABLE_DOM_BUTTONS = '<"row"<"col-sm-12 table-buttons"B>>rt';
    static TABLE_RESULTS_SEARCH = '<"row"<"col-sm-12 datatable-buttons text-right"B>> <"row"<"col-sm-6"l><"col-sm-6 pull-right"f>> rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_BUTTONS_LENGTHMENU_SEARCH = '<"row"<"col-sm-12 table-buttons"B>><"row"<"col-sm-6"l><"col-sm-6 pull-right"f>>rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_BUTTONS_SEARCH = '<"row"<"col-sm-6 table-buttons"B><"col-sm-6 pull-right"f>>rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_BUTTONS_LENGTHMENU = '<"row"<"col-sm-6 table-buttons"B><"col-sm-6 pull-right-length-menu"l>>rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_LENGTHMENU_PAGING = '<"row"<"col-sm-12"l>>rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_LENGTHMENU_SEARCH = '<"row"<"col-sm-6"l><"col-sm-6 pull-right"f>>rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';
    static TABLE_DOM_PAGING = 'rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>';;
    static TABLE_DOM_EMPTY = 'rt';
}