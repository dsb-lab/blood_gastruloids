DIRECTORY="Analysis_Main/"
PALETTE="icefire"

# QC
COUNTS_MIN = 400000
GENES_MIN = 1000
MTFRACTION_MAX = 0.2
# Normalization
MEAN_N_COUNTS=1200000 #Mean of the value
# Dimension reduction
HVGS = {"layer":None,"flavor":"seurat","n_top_genes":None}
PCA = 10
PCA_CONDITION = 5
# DE saved genes
DE_GENES = 2000
DE_TEST = "t-test"
# Neighbours
METRIC = "correlation"
KNN = 5
# Clustering
RESOLUTION = 0.5
RESOLUTION_TIMES = [.3,.2]
# Enrich
ENRICHR_LIBRARIES = ["Descartes_Cell_Types_and_Tissue_2021","PanglaoDB_Augmented_2021"]
# PAGA
KNN_PAGA = 1
N_DOWNSAMPLE = 10
P_DOWNSAMPLE = .5