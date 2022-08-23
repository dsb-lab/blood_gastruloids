#!/bin/bash

read -p "Enter name of analysis (e.g. 1): " NAME

mkdir Analysis_$NAME
mkdir Analysis_$NAME/Results

mkdir Analysis_$NAME/Plots
mkdir Analysis_$NAME/Plots/Global
mkdir Analysis_$NAME/Plots/Sorted
mkdir Analysis_$NAME/Plots/Times
mkdir Analysis_$NAME/Plots/Global/Enrichr
mkdir Analysis_$NAME/Plots/Global/UMAP_flow_cytometry
mkdir Analysis_$NAME/Plots/Global/UMAP_genes
mkdir Analysis_$NAME/Plots/Sorted/Enrichr
mkdir Analysis_$NAME/Plots/Sorted/UMAP_flow_cytometry
mkdir Analysis_$NAME/Plots/Sorted/UMAP_genes
mkdir Analysis_$NAME/Plots/Times/Enrichr
mkdir Analysis_$NAME/Plots/Times/UMAP_flow_cytometry
mkdir Analysis_$NAME/Plots/Times/UMAP_genes

mkdir Analysis_$NAME/Tables
mkdir Analysis_$NAME/Tables/Global
mkdir Analysis_$NAME/Tables/Sorted
mkdir Analysis_$NAME/Tables/Times
