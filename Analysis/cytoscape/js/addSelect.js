//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() {
    loadStages()
    loadColorCodes()
    loadCluster()
   }

function loadStages() {

    let array = ["120hr","144hr","168hr","192hr","216hr"];
   
    // Ordena el Array Alfabeticamente, es muy facil ;)):
    //array.sort();
   
    addOptions("stagesList", array);
   }
   
// funcion para Cargar Provincias al campo <select>
function loadColorCodes() {

    let array = ['stageInt','T', 'Nkx2-5', 'Tbx5', 'Kdr', 'Pecam1', 'Cdh5', 'Cd34', 'Ptprc',
    'Kit', 'Ly6a', 'Ly6e', 'Itga2b', 'Spn', 'Flt3', 'Fcgr3', 'Slamf1',
    'Cd48', 'Esam', 'Notch2', 'Cd93', 'Robo4', 'Ifitm1', 'Ifitm2',
    'Ifitm3', 'Ccn3', 'Etv6', 'Runx1', 'Gata2', 'Meis1', 'Hoxb4',
    'Hoxa9', 'Bmi1', 'Pcgf2', 'Hlf', 'Foxo3', 'Mecom', 'Cbfa2t3',
    'Mllt3', 'Gata1', 'Hbb-bh1', 'Hbb-y', 'Hbb-bs', 'Hbb-bt', 'Bcl11b',
    'Klf1', 'Gfi1b', 'Spi1', 'Cebpa', 'Ebf1', 'Pax5', 'Notch1', 'Tcf3',
    'Gata3', 'Cd24a'];
   
    // Ordena el Array Alfabeticamente, es muy facil ;)):
    //array.sort();
   
    addOptions("colorList", array);
   }
   
function loadCluster() {

    let array = [];

    for(let i = 1; i < 29; i++){
        array[i] = i-1
    }
   
    // Ordena el Array Alfabeticamente, es muy facil ;)):
    //array.sort();
   
    addOptions("clusterList", array);
   }

// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {
    var select = document.getElementsByName(domElement)[0];
   
    for (value in array) {
     var option = document.createElement("option");
     option.text = array[value];
     select.add(option);
    }
   }