#!/bin/bash

#Download Fadlullah data
cd Data_other_studies/Fadlullah
wget https://ftp.ncbi.nlm.nih.gov/geo/series/GSE150nnn/GSE150412/suppl/GSE150412_RawCounts.csv.gz
wget https://ftp.ncbi.nlm.nih.gov/geo/series/GSE150nnn/GSE150412/matrix/GSE150412-GPL19057_series_matrix.txt.gz
gunzip *
mkdir Plots
mkdir Tables
cd ../..

#Download Vink Dataset
cd Data_other_studies/Vink
wget https://ftp.ncbi.nlm.nih.gov/geo/series/GSE143nnn/GSE143637/suppl/GSE143637_HTSeq_counts.txt.gz
wget https://ftp.ncbi.nlm.nih.gov/geo/series/GSE143nnn/GSE143637/matrix/GSE143637_series_matrix.txt.gz
gunzip *
mkdir Plots
mkdir Tables
cd ../..

#Download data Analysis 2021


#Download data Analysis 2022


#Make folder Analysis 2021
cd Analysis_2021
./setup_analysis.sh Main
cd ..

#Make folder Analysis 2022
cd Analysis_2022
./setup_analysis.sh Main
cd ..