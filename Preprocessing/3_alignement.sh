#!/bin/bash

echo "Making manifests"
python python/make_manifest.py

l=$(ls auxiliar/manifest*)

echo "STAR alignement"
for manifest in $l
do
    name=${manifest%.*}
    name2=${name##*/}

    check=results/3_aligned_sequences/Aligned_$name2.sortedByCoord.out.bam
    if test -f $check
    then 
        echo Already exist
    else
        STAR \
        --genomeDir /home2/genomes/mouse/star_index \
        --runThreadN 4 \
        --outSAMtype BAM SortedByCoordinate \
        --quantMode GeneCounts \
        --outFileNamePrefix ./results/3_aligned_sequences/ \
        --outSAMattributes All \
        --readFilesManifest $manifest

        mv results/3_aligned_sequences/Aligned.sortedByCoord.out.bam results/3_aligned_sequences/Aligned_$name2.sortedByCoord.out.bam 
        mv results/3_aligned_sequences/Log.out results/3_aligned_sequences/Log_$name2.out
        mv results/3_aligned_sequences/Log.progress.out  results/3_aligned_sequences/Log_$name2.progress.out 
        mv results/3_aligned_sequences/ReadsPerGene.out.tab  results/3_aligned_sequences/ReadsPerGene_$name2.out.tab 
        mv results/3_aligned_sequences/SJ.out.tab   results/3_aligned_sequences/SJ_$name2.out.tab 
    fi
done