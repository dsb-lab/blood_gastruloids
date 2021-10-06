import os
import pandas

directory = "results/2_trimming2/"
l = os.listdir(directory)

data = pandas.read_csv("../MARTINEZALF_01.csv",skiprows=2,sep="\t")

count = 0
for i in data["SAMPLE NAME"].unique():
    manifest = pandas.DataFrame(columns=["R1","R2","Sample"])
    count2 = 0
    for j in data[data["SAMPLE NAME"]==i].index:
        name = data.loc[j,"FLOWCELL (Read Length indicated)"].split("(")[0]
        name += "_"+str(data.loc[j,"LANE"])
        name += "_"+data.loc[j,"MULTIPLEX INDEX"]
        m = {"R1":directory+name+"_1_val_1.fq","R2":directory+name+"_2_val_2.fq","Sample":name}
        manifest = manifest.append(m,ignore_index=True)

        count += 1
        count2 += 1

        try:
            os.path.exists(directory+name+"_1_val_1.fq")
        except:
            print(name+"_1_val_1.fq", " does not exist.")
            break

    print(i,": ",count2)

    manifest.to_csv("auxiliar/manifest_"+i+".tsv",sep="\t",index=False,header=False)

print("Total: ",count)
