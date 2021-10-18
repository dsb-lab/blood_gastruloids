import pysam
import pandas as pd
import numpy as np
import gtfparse
import os
import scipy.sparse as sprs
import scipy.io as matio
from multiprocessing import Pool

#Make list of bam files
directory = "results/4_features/"
l = os.listdir(directory)

ll = []
for i in l:
    if "Aligned" in i:
        ll.append(i)

# Make gene matrix
print("Making gene matrix")
df = gtfparse.read_gtf("/home2/genomes/mouse/annotation/gencode.vM26.primary_assembly.annotation.gtf")
l = list(set(zip([i.split(".")[0] for i in df["gene_id"].values],df["gene_name"].values)))
geneData = pd.DataFrame()
geneData["gene_id"] = [i[0] for i in l]
geneData["gene_name"] = [i[1] for i in l]

geneData.sort_values("gene_id",inplace=True)
geneData.reset_index(drop=True,inplace=True)
geneData.to_csv("results/5_counts/Genes.csv")

# Make cell matrix
print("Making cell matrix")
cellDataAux = pd.read_csv("../MARTINEZALF_01.csv",sep="\t",skiprows=2)
cellData = pd.DataFrame()
cellData["Plate"] = [i.split("_")[0] for i in cellDataAux["SAMPLE NAME"]]
cellData["Cell"] = cellDataAux["NAME"]
cellData["Time"] = [i.split("_")[1] for i in cellDataAux["SAMPLE NAME"]]
cellData["Condition"] = [i.split("_")[2] for i in cellDataAux["SAMPLE NAME"]]
cellData["BiologicalSample"] = [i.split("_")[3] for i in cellDataAux["SAMPLE NAME"]]
cellData["Lane"] = cellDataAux["LANE"]
cellData.set_index("Cell",inplace=True)
cellData.sort_index(inplace=True)
cellData.to_csv("results/5_counts/Cells.csv")

#Making partial count matrices
cellPos = {j:i for i,j in enumerate(cellData.index)}
genePos = {j:i for i,j in enumerate(geneData["gene_id"].values)}
statistics = pd.DataFrame()
nCells = cellData.shape[0]
nGenes = geneData.shape[0]
def count(input):
    count,filename,nCells,nGenes,cellPos,genePos = input
    m = sprs.lil_matrix((nCells,nGenes),dtype=np.int32)
    print("Counting file ",count," ",filename)
    name=filename.split(".")[0]
    try:
        samfile = pysam.AlignmentFile(directory+filename,"rb")
    except:
        pysam.index(directory+filename)
        samfile = pysam.AlignmentFile(directory+filename,"rb")
        
    for read in samfile:
        if read.has_tag("XT"):
            gene = genePos[read.get_tag("XT").split(".")[0]]
            cell = cellPos[read.query_name.split("SM:")[-1]]

            m[cell,gene] += 1

    samfile.close()

    sprs.save_npz("results/5_counts/count_matrix_"+name,m.tocsr())

print("Making partial count matrices")
if __name__ == '__main__':
    with Pool(7) as p:
        print(p.map(count, [(i,file,nCells,nGenes,cellPos,genePos) for i,file in enumerate(ll)]))

#Integrating all count matrices
directory = "results/5_counts/"
l = os.listdir(directory)

ll = []
for i in l:
    if ".npz" in i and "total" not in i:
        ll.append(i)

m = sprs.csr_matrix((nCells,nGenes),dtype=np.int32)
for name in ll:
    m += sprs.load_npz("results/5_counts/"+name)

sprs.save_npz("results/5_counts/count_matrix_total",m.tocsr())