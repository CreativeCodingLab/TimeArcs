### TimeArcs for Finding Patterns in the IMDB Co-Star Network
The data is available on [IMDB website](http://www.imdb.com/interfaces). We went through 9,963 movies rated 8.3 or higher from 1955 to 2014 across three genres: comedy, action, and drama. In total, our dataset contains over 66,178 actors. The next figure shows *TimeArcs* for the top 2000 actors. In particular, the arcs connect co-actors in the same movies and color coded by movie genres: green for comedy, red for action, blue for drama. TimeArcs helps viewers to quickly identify temporal communities of actors. Each horizontal line represents one actor and connects his or her first through last appearances in highly rated movies. This helps to highlight actors with long careers and many good movies. By brushing any actors' name, we can immediately visualize his or her co-star network to see how it changes over time. Brushing an arc, *TimeArcs* shows the list of movies that actors (at two ends of the arc) co-star in that year. Please try [online demo](http://www2.cs.uic.edu/~tdang/TimeArcs/IMDB/).

![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/IMDB/images/IMDB2.png)

Lensing tool is useful to focus on a sub-network of a larger network. Lensing can be applied on both X and Y axis. 
![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/IMDB/images/IMDB3.png)

The following figure shows lensing into a different time period (on X axis) and lower part of the network (on Y axis).
![ScreenShot](https://github.com/CreativeCodingLab/TimeArcs/blob/master/IMDB/images/IMDB4.png)










