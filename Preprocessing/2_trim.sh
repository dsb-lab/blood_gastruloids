#!/bin/bash

# python python/make_data_names_wto_R.py

# dirlist=$(cat auxiliar/data_names_wto_R | tr '\n' ' ')

# rm *_report.txt
# rm *.fq.gz
# rm *.html
# rm *.zip

# for i in $dirlist
# do
#     check="results/2_trimming/FASTQ_trimmed/"$i"_1_val_1.fq"
#     if test -f $check
#     then 
#         echo Already exist
#     else
#         trim_galore \
#         --fastqc \
#         --cores 4 \
#         --quality 30 \
#         --length 100 \
#         --paired \
#         --clip_R1 15 \
#         --clip_R2 15 \
#         --three_prime_clip_R1 2 \
#         --three_prime_clip_R2 2 \
#         "../data/FASTQ/"$i"_1.fastq.gz" "../data/FASTQ/"$i"_2.fastq.gz"

#         mv *_report.txt results/2_trimming/report
#         mv *.fq.gz results/2_trimming/FASTQ_trimmed
#         mv *.html results/2_trimming/html
#         mv *.zip results/2_trimming/zip

#     fi

#     gunzip results/2_trimming/FASTQ_trimmed/*.gz

# done

python python/add_tags.py