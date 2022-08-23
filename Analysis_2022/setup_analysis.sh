#!/bin/bash

mkdir Analysis_$1
mkdir Analysis_$1/Results

mkdir Analysis_$1/Plots
mkdir Analysis_$1/Plots/Global
mkdir Analysis_$1/Plots/Condition
mkdir Analysis_$1/Plots/Global/Enrichr
mkdir Analysis_$1/Plots/Global/UMAP_flow_cytometry
mkdir Analysis_$1/Plots/Global/UMAP_genes
mkdir Analysis_$1/Plots/Condition/Enrichr
mkdir Analysis_$1/Plots/Condition/UMAP_flow_cytometry
mkdir Analysis_$1/Plots/Condition/UMAP_genes

mkdir Analysis_$1/Tables
mkdir Analysis_$1/Tables/Global
mkdir Analysis_$1/Tables/Condition