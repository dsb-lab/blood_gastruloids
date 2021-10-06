import os
from multiprocessing import Pool

#Make list of files to be modified
directory = "results/2_trimming/FASTQ_trimmed/"
l = os.listdir(directory)

l2 = []
for i in l:
    if ".fq" in i:
        l2.append(directory+i)

def tag(m):
    count,i = m
    out = "results/2_trimming2/"+i.split("/")[-1]
    if not os.path.exists(out):
        print("Tagging file " + out.split("/")[-1], "\n")
        f = open(i,"r")
        fout = open(out,"w")
        cellId = i.split("/")[-1].split("_val_")[0][:-2]
        for count2,j in enumerate(f):
            if j[0] == "@":
                newLine = j[:-1]
                a,b = newLine.split(" ")
                a = a+";SM:"+cellId
                fout.write(a+" "+b+"\n")
            else:
                fout.write(j)

        f.close()
        fout.close()
    else:
        print(str(count) +" already exists.\n")
    # os.remove(i)
    # os.rename("results/2_trimming2/aux.fq","results/2_trimming2/"+i.split("/")[-1])

if __name__ == '__main__':
    with Pool(5) as p:
        print(p.map(tag, enumerate(l2)))