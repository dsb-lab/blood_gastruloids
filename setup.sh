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

#Download Thambyrajah Dataset
cd Data_other_studies/Thambyrajah
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE230792&format=file&file=GSE230792%5FscRNAseq%5FCell%5Fannotation%5Ffinal%2Etxt%2Egz" -O Cell_annotation_final.txt.gz
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE230792&format=file&file=GSE230792%5FscRNAseq%5FNorm%5Fcounts%5Ffiltered%2Etxt%2Egz" -O Norm_counts_filtered.txt.gz
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE230792&format=file&file=GSE230792%5FscRNAseq%5FRaw%5Fcounts%5Ffinal%2Etxt%2Egz" -O Raw_counts_final.txt.gz
gunzip *
mkdir Plots
mkdir Tables
cd ../..

#Download Hou Dataset
cd Data_other_studies/Hou
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE139389&format=file&" -O GSE139389_RAW.tar
tar -xvf GSE139389_RAW.tar
gunzip *
mkdir Plots
mkdir Tables
cd ../..

#Download Zhu Dataset
cd Data_other_studies/Zhu
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE137116&format=file&file=GSE137116%5Fcell%5Fannotation%2Ecsv%2Egz" -O cell_annotation.csv.gz
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE137116&format=file&file=GSE137116%5Fgene%5Fannotation%2Ecsv%2Egz" -O gene_annotation.csv.gz
wget "https://www.ncbi.nlm.nih.gov/geo/download/?acc=GSE137116&format=file&file=GSE137116%5Fgene%5Fby%5Fcell%5Fcount%5Fmatrix%2Etxt%2Egz" -O gene_by_cell_count_matrix.txt.gz
gunzip *
mkdir Plots
mkdir Tables
cd ../..

#Download data Analysis 2021
cd Analysis_2021/Data
wget https://www.ebi.ac.uk/biostudies/files/E-MTAB-12148/Raw.h5ad.gz
gunzip *
cd ../..

#Make folder Analysis 2021
cd Analysis_2021
./setup_analysis.sh Main
cd ..