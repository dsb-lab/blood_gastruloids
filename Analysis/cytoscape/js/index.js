const x = [1,2,3,4,5];
const y = [120,144,168,192,216];
const stdY = [0,0,0,0,0,0,0,0,0];
const xNodeId = ["unselected","unselected","unselected","unselected","unselected"];
const xLabels = ["unselected","unselected","unselected","unselected","unselected"];
let w;
let c;

function rotate() { 
  setTimeout(function (){ 
    cy.nodes().positions(
      function( i, node ){ 
        return { x: node.position('y')*1.5, y: -1*node.position('x')*1.1
      }; 
  }); 
  cy.fit() 
  },100); 
}

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    let $$ = selector => Array.from( document.querySelectorAll( selector ) );
    let $ = selector => document.querySelector( selector );

    let tryPromise = fn => Promise.resolve().then( fn );

    let toJson = obj => obj.json();
    let toText = obj => obj.text();

    let cy;

    let $dataset = $('#data');
    let getDataset = name => fetch(`data/${name}/time_reconstruction.json`).then( toJson );
    let applyDataset = dataset => {
      // so new eles are offscreen
      cy.zoom(0.001);
      cy.pan({ x:-9999999, y: -9999999 });

      // replace eles
      cy.elements().remove();
      cy.add( dataset );
    }
    let applyDatasetFromSelect = () => Promise.resolve( $dataset.value ).then( getDataset ).then( applyDataset );

    let $color = $('#color');
    let getStylesheet = name => {
      let convert = res => toJson(res);

      return fetch(`stylesheets/base.json`).then( convert );
    };
    let applyStylesheet = stylesheet => {

      cy.style().fromJson( stylesheet ).update();

      if ($color.value == "stageInt"){
        c = "mapData("+$color.value+",0,5,blue,red)"
      }else{
        c = "mapData("+$color.value+",0,1,blue,red)"
      }
      cy.style().selector("node").style({'background-color':c}).update()

      plotLayout["title"]["text"] = $color.value
      let ii = 0;
      for (let i = 0; i < 5; i++){
        if (xLabels[i] != "notSet"){
          ii = xNodeId[i];
          y[i] = cy.getElementById(ii).data($color.value)  
          stdY[i] = cy.getElementById(ii).data($color.value+"_std")  
        }
      }
      plotData["y"] = y
      Plotly.newPlot('myDiv', plotData, plotLayout);
    };
    let applyStylesheetFromSelect = () => Promise.resolve( $color.value ).then( getStylesheet ).then( applyStylesheet );

    let $weights = $('#weights');
    let getWeights = name => {
      let convert = res => toJson(res);

      return fetch(`stylesheets/base.json`).then( convert );
    };
    let applyWeights = weight => {

      // cy.style().fromJson( weight ).update();

      switch ($weights.value){
        case "weightForward": w = "mapData(weightForward,0,1,0,10)"; break;
        case "weightBackward": w = "mapData(weightBackward,0,1,0,10)"; break;
      }
      cy.style().selector("edge").style({'width':w}).update()
    };
    let applyWeightsFromSelect = () => Promise.resolve( $weights.value ).then( getWeights ).then( applyWeights );

    let layouts = {
      hierarchical: { // replace with your own layout parameters
        name: 'breadthfirst',
        directed: true,
        padding: 30
      }
    };
    let prevLayout;
    let getLayout = name => Promise.resolve( layouts[ name ] );
    let applyLayout = layout => {
      if( prevLayout ){
        prevLayout.stop();
      }

      let l = prevLayout = cy.makeLayout( layout );
      rotate()

      return l.run().promiseOn('layoutstop');
    }
    let applyLayoutFromSelect = () => Promise.resolve( "hierarchical" ).then( getLayout ).then( applyLayout );

    cy = window.cy = cytoscape({
      container: $('#cy'),

      layout: { // replace with your own layout parameters
          name: 'breadthfirst',
          directed: true,
          padding: 30
      }
    });

    $dataset.addEventListener('change', function(){
      tryPromise( applyDatasetFromSelect ).then( applyLayoutFromSelect );
    });

    $color.addEventListener('change', function(){
      tryPromise( applyStylesheetFromSelect ).then( applyWeightsFromSelect );
      tryPromise( applyDatasetFromSelect2 );
    });

    $weights.addEventListener('change', function(){
      tryPromise( applyStylesheetFromSelect ).then( applyWeightsFromSelect );
    });

    let $tracing = $('#tracing');
    cy.bind('mouseover', 'node', function(node) {
      Promise.resolve($tracing)
      Promise.resolve($weights)
      let cluster = node.cyTarget.data("cluster");
      let annotation = node.cyTarget.data("annotation");
      let stage = node.cyTarget.data("stage");
      document.getElementById('cluster').innerHTML = "<b>Cluster: </b>"+cluster;
      document.getElementById('annotation').innerHTML = "<b>Annotation: </b>"+annotation;
      document.getElementById('stage').innerHTML = "<b>Stage: </b>"+stage;
      document.getElementById('weight').innerHTML = "<b>Weight: - </b>";
    });
    cy.bind('mouseover', 'edge', function(edge) {
      Promise.resolve($tracing)
      Promise.resolve($weights)
      let source = edge.cyTarget.data("source");
      let target = edge.cyTarget.data("target");
      let stage = edge.cyTarget.data("stage");
      let weight = edge.cyTarget.data("weightForward");
      document.getElementById('cluster').innerHTML = "<b>Cluster: - </b>";
      document.getElementById('annotation').innerHTML = "<b>Annotation: - </b>";
      document.getElementById('stage').innerHTML = "<b>Stage: - </b>" ;
      document.getElementById('weight').innerHTML = "<b>Weight: </b>"+weight;
    });
    cy.bind('click', 'node', function(node) {
      Promise.resolve($tracing)
      Promise.resolve($weights)
      // console.log(node.cyTarget.predecessors().edges());
      switch($tracing.value){
        case "false":

          break;
        case "tracing":
          switch ($weights.value){
            case "weightBackward":
              cy.getElementById(xNodeId[node.cyTarget.data("stageInt")]).incomers().edges().animate({style:{lineColor:"lightgrey"}})
              node.cyTarget.incomers().edges().animate({
                style: {
                  lineColor: "red"
                }
              });
              break; 
            case "weightForward":
              cy.getElementById(xNodeId[node.cyTarget.data("stageInt")]).outgoers().edges().animate({style:{lineColor:"lightgrey"}})
              node.cyTarget.outgoers().edges().animate({
                style: {
                  lineColor: "red"
                }
              });
              break;
          }
          cy.getElementById(xNodeId[node.cyTarget.data("stageInt")]).animate({style:{width: 60,height: 60}})
          node.cyTarget.animate({style:{width: 100,height: 100}})
          y[node.cyTarget.data("stageInt")] = node.cyTarget.data($color.value)
          xLabels[node.cyTarget.data("stageInt")] = node.cyTarget.data("cluster")+" "+node.cyTarget.data("annotation")
          xNodeId[node.cyTarget.data("stageInt")] = node.cyTarget.data("id")
          Plotly.newPlot('myDiv', plotData, plotLayout);
          console.log(y)
        }
    });
    cy.bind('cxttap', 'node', function(node) {
      // console.log(node.cyTarget.predecessors().edges());
      node.cyTarget.incomers().edges().animate({
        style: {
          lineColor: "lightgrey"
        }
      });
      node.cyTarget.outgoers().edges().animate({
        style: {
          lineColor: "lightgrey"
        }
      });
    });

    let $clearTrace = $('#clearTrace')
    $clearTrace.addEventListener('click', function(){
      cy.edges().animate({
        style: {
          lineColor: "lightgrey"
        }
      });
      cy.nodes().animate({
        style: {
          width: 60, height: 60
        }
      });
      for(let i = 0; i < 9; i++){
        y[i] = "n"
        xNodeId[i] = "unselected";
        xLabels[i] = "unselected"
      }
      Plotly.newPlot('myDiv', plotData, plotLayout);
    })

    // cy.on("click", "node", (evt) => {evt.cyTarget.ancestors().animate({
    //   style: {lineColor: "red"} }) })
    // cy.off("tap", "node", (evt) => {evt.cyTarget.successors().animate({
    //     style: {lineColor: "grey"} }) })
  
    var plotData = [
      {
        x: x,
        y: y,
        error_y: {
          type: 'data',
          array: stdY,
          visible: true
        },
        type: 'scatter'
      }
    ];
    var plotLayout = {
      title:{text: $color.value, font:{size:20}},
      xaxis:{
        tickmode: "array",
        tickvals: [1,2,3,4,5],
        ticktext: xLabels,
      },
      margin:{l:30,r:30,t:40}
    }
    Plotly.newPlot('myDiv', plotData, plotLayout);

    let $stage = $('#stages');
    let $cluster = $('#clusters');
    function getName(){
      Promise.resolve($dataset.value)
      Promise.resolve($stage.value)
      Promise.resolve($color.value)
      Promise.resolve($cluster.value)

      let m = "data/"+$dataset.value+"/UMAP_"+$stage.value+".json"

      if ($stage.value == ""){ //Initialise option
        m = "data/"+$dataset.value+"/UMAP_120hr.json"
      }

      return m
    }
    let getDataset2 = name => fetch(name).then( toJson );
    let applyDataset2 = dataset => {
      // so new eles are offscreen
      // console.log(dataset)

      var plotUmapData = [
        {
          x: dataset["x"],
          y: dataset["y"],
          mode: 'markers',
          marker:{
            color: dataset[$color.value],
            size: dataset["cluster_"+$cluster.value],
            colorscale: [
                        ["0.0","rgb(236,152,114)"],
                        ["0.125","rgb(228,132,100)"],
                        ["0.25","rgb(228,115,95)"],
                        ["0.372","rgb(212,80,95)"],
                        ["0.5","rgb(184,60,108)"],
                        ["0.625","rgb(168,58,108)"],
                        ["0.75","rgb(144,51,114)"],
                        ["0.875","rgb(110,44,108)"],
                        ["1.","rgb(83,36,100)"]
                      ]
          },
          type: 'scatter',
        }
      ];
      var plotUmapLayout = {
        title:{text: $stage.value + " " + $color.value, font:{size:20}},
        margin:{l:30,r:30,t:40,b:30},
        xaxis:{visible:false},
        yaxis:{visible:false}
      }
      Plotly.newPlot('umap', plotUmapData, plotUmapLayout);

      return
    }
    let applyDatasetFromSelect2 = () => Promise.resolve( ).then( getName ).then( getDataset2 ).then( applyDataset2 );

    $stage.addEventListener('change', function(){
      tryPromise( applyDatasetFromSelect2 );
    });    
    $cluster.addEventListener('change', function(){
      tryPromise( applyDatasetFromSelect2 );
    });    

    tryPromise( applyDatasetFromSelect ).then( applyStylesheetFromSelect ).then( applyWeightsFromSelect ).then( applyLayoutFromSelect )
    tryPromise( applyDatasetFromSelect2 );

  });
  
})();

// tooltips with jQuery
$(document).ready(() => $('.tooltip').tooltipster());