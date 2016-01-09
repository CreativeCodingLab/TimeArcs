# IndexCardVisualizations
Home of FRIES/PathwayCommon IndexCard alignment visualizations 

The following document shows TimeArcs visualization for Pathway Commons index cards. 

Time axis goes from left (2000) to right (2014). An arc connects two proteins/complexes at a particular time (based on when the interaction was discovered/ publication year). The colors encode interaction types: green for adds_modification, red for removes_modification, blue for translocation, orange for binds, and pink for increases. A black (and usually thicker) arc indicates multiple interactions between two proteins/complexes which are discovered in the same year (and probably in the same publication). The horizontal lines connect multiple occurrences of the same proteins/complexes in different publications/years.

![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/summary.png)

For the same amount of data, we can use a force directed layout (without time element) to visualize as depicted in the following image. Over-plotting protein/complex labels obscures the base graph, and the labels themselves. In contrast, by organizing text labels vertically (and evenly spaced) and locating them horizontally at the first occurrence (first publication year), TimeArcs reduces the over-plotting problem significantly as depicted in the above picture.  

![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/summary2.png)

When there are multiple connections (arcs) between two proteins/complexes, it may falls into one of the two following circumstances: (1) If they have the same color (same interaction type), these are supporting evidences in different publications which confirm the interaction between two elements. (2) If they have the different colors (different interaction types), the latter evidence may adds more knowledge or conflicts the previous publication. We will show an example of each circumstances in the next Section.
 
# Supporting evidences:
 In the following figure, we show TimeArcs visualization for interactions between PCAF complex and other elements (which were recorded by evidences in Pathway Commons index cards). In particular above PCAF timeline, we can see there are new evidences in 2013 supporting "PCAF binds p300 and KAT3A" which was first discovered in 2011. Similarly under PCAF timeline, there are 3 evidences supporting "PCAF binds MAML" in 2008, 2011, and 2013. Here are the details of these 3 evidences:
 
 ![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/supporting.png).
 
 (1) "Authored: Caudy, M, 2008-09-05",
    "Mammalian CSL Coactivator Complexes: Upon activation of Notch signaling, cleavage of the transmembrane Notch receptor releases the Notch Intracellular Domain (NICD), which translocates to the nucleus, where it binds to CSL and displaces the corepressor complex from CSL (reviewed in Mumm, 2000 and Kovall, 2007). The resulting CSL-NICD "binary complex" then recruits an additional coactivator, Mastermind (Mam), to form a ternary complex. The ternary complex then recruits additional, more general coactivators, such as CREB Binding Protein (CBP), or the related p300 coactivator, and a number of Histone Acetytransferase (HAT) proteins, including GCN5 and PCAF (Fryer, 2002). There is evidence that Mam also can subsequently recruit specific kinases that phosphorylate NICD, to downregulate its function and turn off Notch signaling (Fryer, 2004)."

The complete PC card can be downloaded [here](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/supporting1.json).

 (2) "Authored: Egan, SE, Orlic-Milacic, M, 2011-11-14",
    "TAD and PEST domains of NOTCH intracellular domain contain multiple conserved cyclin-dependent kinase phosphorylation sites. In vitro, recombinant human CDK8 in complex with recombinant human cyclin C (CDK8:CCNC) readily phosphorylates recombinant Xenopus NICD1 (xNICD1). This phosphorylation also occurs when these recombinant proteins are expressed in HeLa cells, and was directly shown to involve conserved serine residues in the PEST domain. Phosphorylation by CDK8 targets xNICD1 for ubiquitination and subsequent degradation, thereby coordinating NICD1 transcriptional activity with NICD1 turnover."
 
 The complete PC card can be downloaded [here](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/supporting2.json).
    
 (3) "Authored: Orlic-Milacic, M, 2013-01-04",
    "While CDK8 can probably phosphorylate the TAD domain of NICD1 PEST domain mutants, it cannot phosphorylate the PEST domain of these mutants as it is partially or completely truncated." 

The complete PC card can be downloaded [here](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/supporting3.json).


# Conflicting evidences:

 In the following figure, we show TimeArcs visualization for interactions between OPSD protein and other elements. In particular, we can see there are a few conflicting evidences between 2003 and 2012 publications. We are going to show only one conflicting example where OPSD and K+ appear both in positive and negative regulations denoted as (1) and (2) in the following figure. 
 
 ![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/conflicting.png)

1) "Authored: Carleton, KL, 2003-07-31", "interaction_type" : "adds_modification",
    "Protein phosphatase 2A removes the phosphates from phosphorylated rhodopsin (p MII) and phosphorylated opsin (p-RHO) (Fowles et al. 1989, Palczewski et al. 1989a,b). A Ca2+ dependent opsin phosphatase is also present (Kutuzov & Bennett 1996). Serine/threonine protein phosphatases with EF hands (PPEF1 and 2) that share homology with Drosophila retinal degeneration C (rdgC) are expressed in retina and may be responsible (Huang & Honkanen 1998), there is no evidence for a physiological role in dephosphorylating rhodopsin. Once dephosphorylated, RHO can once again bind the chromophore 11 cis retinal (11cRAL), in readiness for the next photon response. Arrestin (S-antigen or SAG, Yamaki et al. 1988) binds to and sterically caps MII, preventing PPEF1 from dephosphorylating it."

The complete PC card can be downloaded [here](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/conflicting1.json).

 (2) "Jassal, Bijay, 2012-11-13", "interaction_type" : "removes_modification",
    "Activated rhodopsin (MII aka R*) must be deactivated to terminate the single photon response. Deactivation begins during the rising phase of the single photon response after MII binds rhodopsin kinase (GRK1), a serine/threonine protein kinase (Khani et al. 1996). GRK1 is activated by MII whereupon it phosphorylates MII at multiple serine and threonine sites on its C terminus. There are six serine and threonine residues that can be phosphorylated. Increasing phosphorylation progressively reduces the rate at which MII can activate transducin but full quenching requires the binding of arrestin (S-antigen or SAG, Yamaki et al. 1988) which binds to and sterically caps MII (Burns & Pugh 2010, Korenbrot 2012).<br><br>A substantial fraction of rhodopsin kinase (GRK1) is bound to recoverin (RCVRN) in darkness, when internal Ca2+ levels are high. RCVRN is an EF-hand protein (Murakami et al. 1992) that functions as a myristoyl switch. With Ca2+ bound, the myristoyl group is exposed to attach RCVRN to the membrane. When Ca2+ levels drop with light exposure, Ca2+ dissociates from RCVRN and GRK1 is released. Higher levels of free GRK1 accelerate the phosphorylation and shutoff of photoexcited rhodopsin (MII).<br><br>Certain mutations in GRK1 cause Oguchi type 2 disease, a rare, recessive form of congenital stationary night blindness (https://sph.uth.edu/retnet/)."
 
 The complete PC card can be downloaded [here](http://www.cs.uic.edu/~tdang/TimeArcs/imagesForPCcards/conflicting2.json).
    

 