## TimeArcs: Visualizing Fluctuations in Dynamic Networks
Please click to watch the overview video.

[![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/EuroVis2016/VideoTeaser.png)](http://www.cs.uic.edu/~tdang/TimeArcs/EuroVis2016/TimeArcs_Dang_EuroVis2016.mp4)

We introduce *TimeArcs*, a novel visualization technique for representing the dynamic relationships between entities in a network. In many application domains, relationships between entities are not temporally stable, which means that cluster structures and cluster memberships also may vary across time. Our technique provides a big picture overview of the most significant clusters over time. *TimeArcs* also supports a range of interactive features, such as allowing users to drill-down in order to see details about a particular cluster. To highlight the benefits of this technique, we demonstrate its application to various datasets, including the collocated popular phrases obtained from political blogs, IMDB co-star network, and  a dataset showing conflicting evidences within biomedical literature of protein interactions.  

### Exploring Topics and Events in Political Blogs
The following image shows the top 100 terms in nearly 100,000 political blog posts in last 10 years. Terms are color-coded by category as depicted on the top left. Terms appear together in political blogs are brought closer and connected by arcs. The arc thickness indicates the frequency of collocated terms. More details and source codes can be found [here](https://github.com/CreativeCodingLab/TimeArcs/tree/master/Text) or [online demo](http://www2.cs.uic.edu/~tdang/TimeArcs/Text/).

**Box A:** Viewers can quickly see the major political events such as the Sandy Hook Elementary School shooting or the 2011 shooting by Jared Loughner. Notice that the two events happened in Tucson and hence both are connected to this term. And this is why they are sitting closer on the vertical axis. 

**Box B:** In the blogs about Ferguson and Michael Brown in 2014, the name Trayvon Martin is often mentioned due to the similar nature of the two events. 

**Box C:** Some relationships last for long period of time. For example, the term Edward Snowden and NSA suddenly became highly correlated when he (Snowden) was the principal source of disclosures about top-secret National Security Agency programs in [June 2013](https://www.washingtonpost.com/politics/intelligence-leaders-push-back-on-leakers-media/2013/06/09/fff80160-d122-11e2-a73e-826d299ff459_story.html). The relation fades out within a year.

![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/Text/images/PoliticalBlogs1.png)

### Finding Patterns in the IMDB Co-Star Network
The following image shows TimeArcs visualization for the top 100 actors from [IMDB database](http://www.imdb.com/interfaces) in movies rated 8 stars or higher from 1955 to 2014. Arcs connect co-actors in the same movies and color-coded by movie genres: green for comedy, red for action, blue for drama. More examples and source codes can be found [here](https://github.com/CreativeCodingLab/TimeArcs/tree/master/IMDB) or [online demo](http://www2.cs.uic.edu/~tdang/TimeArcs/IMDB/).

![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/IMDB/images/IMDB1.png)

### Evidence in Biological Pathway Literature
The following image shows TimeArcs visualization for Pathway Commons index cards. Time axis goes from left (2002) to right (2014). An arc connects two proteins/complexes at a particular time (based on when the interaction was discovered/ publication year). The colors encode interaction types: green for adds_modification, red for removes_modification, blue for translocation, orange for binds, and pink for increases. A black (and usually thicker) arc indicates multiple interactions between two proteins/complexes which are discovered in the same year. More details and source codes can be found [here](https://github.com/CreativeCodingLab/TimeArcs/tree/master/IndexCards) or [online demo](http://www2.cs.uic.edu/~tdang/TimeArcs/IndexCards/).

![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/IndexCards/images/PC1.png)

### Acknowledgments
This work was funded by the DARPA Big Mechanism Program under ARO contract WF911NF-14-1-0395.


 