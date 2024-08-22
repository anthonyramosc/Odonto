import { CoreMenu } from '@core/types'



export const menu: CoreMenu[] = [

    //Inicio
    {
        id: 'app',
        title: '',
        translate: 'MENU.RIESGOS',
        type: 'section',
        icon: 'home',
        hidden: false, //true | false
        children: [
            {
                id: 'app',
                title: 'Agenda',
                translate: '',
                type: 'item',
                icon: 'calendar',
                hidden: false, //true | false
                url: 'dashboard',
            },
            {
                id: 'app',
                title: 'Pacientes',
                translate: '',
                type: 'collapsible',
                icon: 'users',
                hidden: false, //true | false
                children: [
                    {
                        id: 'lista-pacientes',
                        icon: 'circle',
                        title: 'Listado',
                        translate: '',
                        type: 'item',
                        url: 'pacientes/listado',
                    },
                    {
                        id: 'lista-proveedores',
                        icon: 'circle',
                        title: 'Ficha de paciente',
                        translate: '',
                        type: 'item',
                        url: 'pacientes/ficha',
                    },
                ]
            },
            {
                id: 'app',
                title: 'Facturacion',
                translate: '',
                type: 'item',
                icon: 'file-text',
                hidden: false, //true | false
                url: '#',
            },
            {
                id: 'app',
                title: 'Administración',
                translate: '',
                type: 'item',
                icon: 'database',
                hidden: false, //true | false
                url: '#',
            },
            {
                id: 'app',
                title: 'Configuración',
                translate: '',
                type: 'item',
                icon: 'settings',
                hidden: false, //true | false
                url: '#',
            },

            // {
            //     id: 'app',
            //     title: 'Proveedores',
            //     translate: '',
            //     type: 'collapsible',
            //     icon: 'users',
            //     hidden: false, //true | false
            //     children: [
            //         {
            //             id: 'lista-proveedores',
            //             icon: '',
            //             title: 'Listado',
            //             translate: '',
            //             type: 'item',
            //             url: 'proveedores/reportes/listado',
            //         },
            //     ]
            // },
            // {
            //     id: 'contabilidad',
            //     title: 'Contabilidad',
            //     translate: '',
            //     type: 'collapsible',
            //     icon: 'package',
            //     hidden: false, //true | false
            //     children: [
            //         {
            //             id: 'app',
            //             icon: '',
            //             title: 'Comprobantes',
            //             translate: '',
            //             type: 'item',
            //             url: 'contabilidad/reportes/comprobantes/listar',
            //         },
            //         // {
            //         //     id: 'app',
            //         //     icon: '',
            //         //     title: 'Visualizar',
            //         //     translate: '',
            //         //     type: 'item',
            //         //     url: '#',
            //         // },
            //         {
            //             id: 'app',
            //             icon: '',
            //             title: 'Editar',
            //             translate: '',
            //             type: 'item',
            //             url: 'contabilidad/reportes/comprobantes/editar',
            //         },
            //     ]
            // }
        ]
    },


    // {
    //     id: 'sgo',
    //     title: 'SGO',
    //     translate: 'MENU.RIESGOS',
    //     type: 'section',
    //     icon: 'menu',
    //     hidden: false, //true | false
    //     children: [
    //         //Dacion de pago ==================================
    //         {
    //             id: 'c04',
    //             title: 'Pacientes',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false

    //         },
    //         //Dacion de pago ==================================
    //         //Inversiones ==================================
    //         {
    //             id: 'i01',
    //             title: 'Inversiones y F. Disp',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'i-i01',
    //                     icon: 'menu',
    //                     title: 'Registro de información',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'gestion-estructuras/gestion-inversiones/registro-inversiones',
    //                 },
    //                 {
    //                     id: 'r-i01',
    //                     icon: 'circle',
    //                     title: 'Estructura I01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/inversiones/i01',
    //                 },
    //                 {
    //                     id: 'r-i02',
    //                     icon: 'circle',
    //                     title: 'Estructura I02',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/inversiones/i02',
    //                 },
    //             ]
    //         },
    //         //Inversiones ==================================
    //         //Reclamos ==================================
    //         {
    //             id: 'CI01',
    //             title: 'Reclamo de cobros indebidos',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'i-CI01',
    //                     icon: 'menu',
    //                     title: 'Registro de información',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'gestion-estructuras/registro-reclamo',
    //                 },
    //                 {
    //                     id: 'r-CI01',
    //                     icon: 'circle',
    //                     title: 'Estructura CI01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/estructura-reclamos',
    //                 }
    //             ]
    //         },
    //         //Reclamos ==================================
    //         //Socios =====================================
    //         {
    //             id: 's01',
    //             title: 'Socios',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box', //grid
    //             hidden: false, //true | false
    //             // badge: {
    //             //     title: 'Nuevo',
    //             //     translate: 'MENU.RIESGOS',
    //             //     classes: 'badge-light-success badge-pill'
    //             // },
    //             children: [
    //                 {
    //                     id: 's01',
    //                     icon: 'circle', //pie-chart
    //                     title: 'Estructura S01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/estructura-socios',
    //                 }
    //             ]
    //         },
    //         //Socios =====================================
    //         //Genero =====================================
    //         {
    //             id: 'ig01',
    //             title: 'Indicadores de Género',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box', //grid
    //             hidden: false, //true | false
    //             // badge: {
    //             //     title: 'Nuevo',
    //             //     translate: 'MENU.RIESGOS',
    //             //     classes: 'badge-light-success badge-pill'
    //             // },
    //             children: [
    //                 {
    //                     id: 'ig01',
    //                     icon: 'circle',
    //                     title: 'Estructura IG01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/indicadores-genero',
    //                 }
    //             ]
    //         },
    //         //Genero =====================================
    //     ]
    // },


    // {
    //     id: 'seps',
    //     title: 'ESTRUCTURAS SEPS',
    //     translate: 'MENU.RIESGOS',
    //     type: 'section',
    //     icon: 'home',
    //     hidden: false, //true | false
    //     children: [
    //         //Dacion de pago ==================================
    //         {
    //             id: 'c04',
    //             title: 'Bienes en dacion de pago',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'i-c04',
    //                     icon: 'menu',
    //                     title: 'Registro de información',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'gestion-estructuras/gestion-dacionpago/registro-dacionpago',
    //                 },
    //                 {
    //                     id: 'r-c04',
    //                     icon: 'circle',
    //                     title: 'Estructura C04',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/bienes-recibidos/c04',
    //                 }
    //             ]
    //         },
    //         //Dacion de pago ==================================
    //         //Inversiones ==================================
    //         {
    //             id: 'i01',
    //             title: 'Inversiones y F. Disp',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'i-i01',
    //                     icon: 'menu',
    //                     title: 'Registro de información',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'gestion-estructuras/gestion-inversiones/registro-inversiones',
    //                 },
    //                 {
    //                     id: 'r-i01',
    //                     icon: 'circle',
    //                     title: 'Estructura I01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/inversiones/i01',
    //                 },
    //                 {
    //                     id: 'r-i02',
    //                     icon: 'circle',
    //                     title: 'Estructura I02',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/inversiones/i02',
    //                 },
    //             ]
    //         },
    //         //Inversiones ==================================
    //         //Reclamos ==================================
    //         {
    //             id: 'CI01',
    //             title: 'Reclamo de cobros indebidos',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'i-CI01',
    //                     icon: 'menu',
    //                     title: 'Registro de información',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'gestion-estructuras/registro-reclamo',
    //                 },
    //                 {
    //                     id: 'r-CI01',
    //                     icon: 'circle',
    //                     title: 'Estructura CI01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/estructura-reclamos',
    //                 }
    //             ]
    //         },
    //         //Reclamos ==================================
    //         //Socios =====================================
    //         {
    //             id: 's01',
    //             title: 'Socios',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box', //grid
    //             hidden: false, //true | false
    //             // badge: {
    //             //     title: 'Nuevo',
    //             //     translate: 'MENU.RIESGOS',
    //             //     classes: 'badge-light-success badge-pill'
    //             // },
    //             children: [
    //                 {
    //                     id: 's01',
    //                     icon: 'circle', //pie-chart
    //                     title: 'Estructura S01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/estructura-socios',
    //                 }
    //             ]
    //         },
    //         //Socios =====================================
    //         //Genero =====================================
    //         {
    //             id: 'ig01',
    //             title: 'Indicadores de Género',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box', //grid
    //             hidden: false, //true | false
    //             // badge: {
    //             //     title: 'Nuevo',
    //             //     translate: 'MENU.RIESGOS',
    //             //     classes: 'badge-light-success badge-pill'
    //             // },
    //             children: [
    //                 {
    //                     id: 'ig01',
    //                     icon: 'circle',
    //                     title: 'Estructura IG01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/indicadores-genero',
    //                 }
    //             ]
    //         },
    //         //Genero =====================================
    //     ]
    // },

    // {
    //     id: 'bce',
    //     title: 'ESTRUCTURAS BCE',
    //     translate: 'MENU.RIESGOS',
    //     type: 'section',
    //     icon: 'home',
    //     hidden: false, //true | false
    //     children: [
    //         {
    //             id: 'bcee',
    //             title: 'Banco Central Ecuador',
    //             translate: '',
    //             type: 'collapsible',
    //             icon: 'box',
    //             hidden: false, //true | false
    //             children: [
    //                 {
    //                     id: 'bce01',
    //                     icon: 'circle',
    //                     title: 'Estructura BCE01',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/bce/bce01',
    //                 },
    //                 {
    //                     id: 'bce02',
    //                     icon: 'circle',
    //                     title: 'Estructura BCE02',
    //                     translate: '',
    //                     type: 'item',
    //                     url: 'reportes/bce/bce02',
    //                 }
    //             ]
    //         }
    //     ]
    // },


    // REPORTE ROTEF
    // {
    //     id: 'sri',
    //     title: 'SRI',
    //     translate: 'MENU.RIESGOS',
    //     type: 'section',
    //     icon: 'home',
    //     hidden: false, //true | false
    //     children: [
    //         {
    //             id: 'rotef',
    //             title: 'Anexo ROTEF',
    //             translate: '',
    //             type: 'item',
    //             icon: 'file-text',
    //             hidden: false, //true | false
    //             url: 'reportes/rotef',
    //         }
    //     ]
    // },

]
