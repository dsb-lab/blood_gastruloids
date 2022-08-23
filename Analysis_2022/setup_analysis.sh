#!/bin/bash

read -p "Enter name of analysis (e.g. 1): " NAME

mkdir Analysis_$NAME
mkdir Analysis_$NAME/Results
mkdir Analysis_$NAME/Tables
mkdir Analysis_$NAME/Plots
mkdir Analysis_$NAME/Plots/Enrichr
mkdir Analysis_$NAME/Plots/UMAP_flow_cytometry
mkdir Analysis_$NAME/Plots/UMAP_genes
