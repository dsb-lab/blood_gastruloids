#!/bin/bash

dirlist=$(ls -t ../data/FASTQ/*.fastq.gz | tr '\n' ' ')

for i in $dirlist
do
    fastqc \
    -o results/1_initial_qc/ \
    --noextract \
    $i
done