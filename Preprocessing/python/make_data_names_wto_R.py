import os
import pandas

directory = "../data/FASTQ"
l = os.listdir(directory)

data = pandas.DataFrame(columns=["Name"])

for i in l:
    if "1.fastq.gz" in i:
        name = i.split(".")[0][:-2]
        m = {"Name":name}
        data = data.append(m,ignore_index=True)

data.loc[:,:].to_csv("auxiliar/data_names_wto_R",sep="\t",index=False,header=False)