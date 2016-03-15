## TimeArcs: Visualizing Fluctuations in Dynamic Networks
Please click to watch the overview video.

[![ScreenShot](http://www.cs.uic.edu/~tdang/TimeArcs/EuroVis2016/VideoTeaser.png)](http://www.cs.uic.edu/~tdang/TimeArcs/EuroVis2016/TimeArcs_Dang_EuroVis2016.mp4)

We introduce *TimeArcs*, a novel visualization technique for representing the dynamic relationships between entities in a network. In many application domains, relationships between entities are not temporally stable, which means that cluster structures and cluster memberships also may vary across time. Our technique provides a big picture overview of the most significant clusters over time. *TimeArcs* also supports a range of interactive features, such as allowing users to drill-down in order to see details about a particular cluster. To highlight the benefits of this technique, we demonstrate its application to various datasets, including the collocated popular phrases obtained from political blogs, IMDB co-star network, and  a dataset showing conflicting evidences within biomedical literature of protein interactions.  

### Exploring Topics and Events in Political Blogs
The following image shows the top 100 terms in nearly 100,000 political blog posts in last 10 years. Terms are color-coded by category as depicted on the top left. Terms appear together in political blogs are brought closer and connected by arcs the thickness indicating their collocated frequency. More examples and source codes can be found [here](https://github.com/CreativeCodingLab/TimeArcs/tree/master/Text)

**Box A:** Viewers can quickly see the major political events such as the Sandy Hook Elementary School shooting or the 2011 shooting by Jared Loughner. Notice that the two events happened in Tucson and hence both are connected to this term. And this is why they are sitting closer on the vertical axis. 

**Box B:** In the blogs about Ferguson and Michael Brown in 2014, the name Trayvon Martin is often mentioned due to the similar nature of the two events. 

**Box C:** Some relationships last for long period of time such as those between Edward Snowden and NSA. Viewers can lens into a period of time to see the details by mousing over the time axis. 

![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/Text/images/PoliticalBlogs1.png)

### Finding Patterns in the IMDB Co-Star Network

### Evidence in Biological Pathway Literature

This work was funded by the DARPA Big Mechanism Program under ARO contract WF911NF-14-1-0395.


 