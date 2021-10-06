import pysam

filename =  "results/4_counts/Aligned.sortedByCoord.out.bam.featureCounts.bam"

try:
    samfile = pysam.AlignmentFile(filename,"rb")
except:
    pysam.index(filename)
    samfile = pysam.AlignmentFile(filename,"rb")

pairedreads = pysam.AlignmentFile("allpaired.bam", "wb", template=samfile)

countOut = 0
count = 0
for read in samfile:
    if read.get_tag("XS") not in  ["Unassigned_NoFeatures","Unassigned_MultiMapping","Unassigned_Ambiguity"]:
        name = read.query_name
        cellId = name.split(";")[1].split(":")[1]
        name = name.split(";")[0]
        read.query_name = name
        read.set_tag("SM",cellId)
        try:
            read.get_tag("XT")
        except:
            print(read)
            break
        pairedreads.write(read)
    else:
        countOut += 1

    count += 1

print("Chains removed: ", countOut, "/", count, " (",100*countOut/count,"%)")
print("Chains left: ", count-countOut, "/", count," (",100-100*countOut/count,"%)")

samfile.close()
pairedreads.close()