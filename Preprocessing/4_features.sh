#!/bin/bash

l=$(ls results/3_aligned_sequences/*.bam)

echo "Assign genes"
for manifest in $l
do
    echo $manifest

    featureCounts \
    $manifest \
    -a /home2/genomes/mouse/annotation/gencode.vM26.primary_assembly.annotation.gtf \
    -o results/4_features/gene_assigned_$name2 \
    -R BAM \
    -T 4 \
    -g "gene_id"
done

# samtools sort results/4_features/Aligned.sortedByCoord.out.bam.featureCounts.bam -o results/4_features/assigned_sorted.bam
# samtools index results/4_features/assigned_sorted.bam

# umi_tools count  \
# --per-gene \
# --gene-tag=XS \
# --umi-tag=RX \
# --umi-tag-split=: \
# --umi-tag-delimiter=; \
# --gene-tag \
# --assigned-status-tag=XS \
# --per-cell \
# --cell-tag=SM \
# --extract-umi-method=tag \
# -I results/4_features/assigned_sorted.bam \
# -S results/4_features/counts_umi_counts.tsv
